import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, phone, service, budget, timeline, message } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      );
    }

    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const recipientEmail = process.env.RECIPIENT_EMAIL;

    if (!smtpUser || !smtpPass || !recipientEmail) {
      console.error("[contact/route] SMTP email configuration is incomplete");
      return NextResponse.json(
        { error: "Email is not configured." },
        { status: 503 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user: smtpUser, pass: smtpPass },
    });

    await transporter.sendMail({
      from: smtpUser,
      to: recipientEmail,
      replyTo: email,
      subject: `New project inquiry from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Company: ${company || "-"}`,
        `Phone: ${phone || "-"}`,
        `Service: ${service || "-"}`,
        `Budget: ${budget || "-"}`,
        `Timeline: ${timeline || "-"}`,
        "",
        "What they are building:",
        message || "-",
      ].join("\n"),
    });

    const hubspotToken = process.env.HUBSPOT_ACCESS_TOKEN;

    if (hubspotToken) {
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
      } else {
        console.log("[contact/route] HubSpot contact created");
      }
    } else {
      console.warn("[contact/route] HUBSPOT_ACCESS_TOKEN not set; email sent without HubSpot sync");
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact/route] error:", err);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}