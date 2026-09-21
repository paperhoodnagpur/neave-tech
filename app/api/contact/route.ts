import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

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

    const fields = [
      ["Name", name],
      ["Email", email],
      ["Company", company],
      ["Phone", phone],
      ["Service", service],
      ["Budget", budget],
      ["Timeline", timeline],
    ].filter(([, value]) => value?.trim());

    const fieldRows = fields
      .map(
        ([label, value]) => `
          <tr>
            <td style="padding: 16px 20px; border-bottom: 1px solid #e5e7eb; color: #4b5563; font-weight: 600; width: 34%;">${escapeHtml(label)}</td>
            <td style="padding: 16px 20px; border-bottom: 1px solid #e5e7eb; color: #111827;">${escapeHtml(value)}</td>
          </tr>`
      )
      .join("");

    const messageCard = message?.trim()
      ? `
        <div style="margin-top: 24px; padding: 24px; background: #f3f4f6; border: 1px solid #e5e7eb; border-radius: 12px;">
          <div style="margin-bottom: 10px; color: #111827; font-size: 16px; font-weight: 700;">What they are building</div>
          <div style="color: #374151; line-height: 1.7; white-space: pre-wrap;">${escapeHtml(message)}</div>
        </div>`
      : "";

    await transporter.sendMail({
      from: `NeaveTech <${smtpUser}>`,
      to: recipientEmail,
      replyTo: email,
      subject: `New project inquiry from ${name}`,
      text: [
        ...fields.map(([label, value]) => `${label}: ${value}`),
        "",
        ...(message?.trim() ? ["What they are building:", message] : []),
      ].join("\n"),
      html: `
        <div style="margin: 0; padding: 32px 16px; background: #f3f4f6; font-family: Arial, sans-serif; color: #111827;">
          <div style="max-width: 680px; margin: 0 auto; overflow: hidden; background: #ffffff; border-radius: 14px; box-shadow: 0 4px 18px rgba(15, 23, 42, 0.08);">
            <div style="padding: 30px 32px; background: #0f1d32; color: #ffffff;">
              <div style="margin-bottom: 12px; color: #cbd5e1; font-size: 14px; letter-spacing: 0.04em;">neave.tech contact form</div>
              <div style="font-size: 30px; font-weight: 700;">New project inquiry</div>
            </div>
            <div style="padding: 28px 24px 32px;">
              <table role="presentation" style="width: 100%; border-collapse: collapse; font-size: 15px;">
                <tbody>${fieldRows}</tbody>
              </table>
              ${messageCard}
            </div>
            <div style="padding: 20px 24px; background: #eef2f7; color: #4b5563; text-align: center; font-size: 14px;">
              Reply directly to this email to respond to ${escapeHtml(name)}.
            </div>
          </div>
        </div>`,
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