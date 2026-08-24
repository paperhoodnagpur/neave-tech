import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, phone } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      );
    }

    const hubspotToken = process.env.HUBSPOT_ACCESS_TOKEN;

    if (!hubspotToken) {
      console.error("[contact/route] HUBSPOT_ACCESS_TOKEN not set");
      return NextResponse.json(
        { error: "HubSpot is not configured." },
        { status: 503 }
      );
    }

    const hubspotRes = await fetch(
      "https://api.hubapi.com/crm/v3/objects/contacts",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${hubspotToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          properties: {
            email,
            firstname: name,
            phone: phone || "",
            company: company || "",
            hs_lead_status: "NEW",
            lifecyclestage: "lead",
          },
        }),
      }
    );

    if (!hubspotRes.ok) {
      const errText = await hubspotRes.text();
      console.error("[contact/route] HubSpot error:", errText);
      return NextResponse.json(
        { error: "Failed to create HubSpot contact." },
        { status: 500 }
      );
    }

    console.log("[contact/route] HubSpot contact created");
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact/route] error:", err);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}