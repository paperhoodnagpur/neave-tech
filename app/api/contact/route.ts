import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const recipientEmail = process.env.RECIPIENT_EMAIL;

    if (!smtpUser || !smtpPass || !recipientEmail) {
      console.error('[contact/route] Missing SMTP configuration');
      return NextResponse.json(
        { error: 'Email service is not configured yet. Please contact us directly.' },
        { status: 503 },
      );
    }

    const body = await req.json();
    const { name, email, company, phone, service, budget, timeline, message } =
      body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // SSL
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const htmlBody = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
        <h2 style="border-bottom: 2px solid #6c63ff; padding-bottom: 8px; color: #6c63ff;">
          New Project Inquiry — Neave Technologies
        </h2>

        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <tr>
            <td style="padding: 10px 8px; font-weight: 600; width: 160px; background: #f5f5f5;">Full Name</td>
            <td style="padding: 10px 8px;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 8px; font-weight: 600; background: #f5f5f5;">Email</td>
            <td style="padding: 10px 8px;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px 8px; font-weight: 600; background: #f5f5f5;">Company</td>
            <td style="padding: 10px 8px;">${company || "—"}</td>
          </tr>
          <tr>
            <td style="padding: 10px 8px; font-weight: 600; background: #f5f5f5;">Phone</td>
            <td style="padding: 10px 8px;">${phone || "—"}</td>
          </tr>
          <tr>
            <td style="padding: 10px 8px; font-weight: 600; background: #f5f5f5;">Service</td>
            <td style="padding: 10px 8px;">${service}</td>
          </tr>
          <tr>
            <td style="padding: 10px 8px; font-weight: 600; background: #f5f5f5;">Budget</td>
            <td style="padding: 10px 8px;">${budget}</td>
          </tr>
          <tr>
            <td style="padding: 10px 8px; font-weight: 600; background: #f5f5f5;">Timeline</td>
            <td style="padding: 10px 8px;">${timeline}</td>
          </tr>
        </table>

        <div style="margin-top: 24px;">
          <h3 style="color: #6c63ff;">Project Details</h3>
          <p style="background: #f9f9f9; padding: 16px; border-left: 3px solid #6c63ff; white-space: pre-wrap;">${message}</p>
        </div>

        <p style="margin-top: 32px; font-size: 12px; color: #888;">
          Sent via Neave Technologies contact form · ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST
        </p>
      </div>
    `;

    await transporter.sendMail({
      from: `"Neave Technologies Contact" <${smtpUser}>`,
      to: recipientEmail,
      replyTo: email,
      subject: `New inquiry — ${company || name}`,
      html: htmlBody,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact/route] sendMail error:", err);
    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500 },
    );
  }
}
