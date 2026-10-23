import nodemailer from "nodemailer";

const STAFF_NOTIFICATION_TO = "social.anmol@gmail.com";

export function mailConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.MAIL_FROM);
}

function createTransport() {
  const port = Number(process.env.SMTP_PORT || 587);
  const secure = port === 465;
  const auth = process.env.SMTP_USER
    ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS || "" }
    : undefined;
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure,
    requireTLS: !secure,
    auth,
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
    tls: { minVersion: "TLSv1.2" },
  });
}

export async function sendStaffCopy({ subject, text }) {
  if (!mailConfigured()) {
    console.error("Staff notification was not sent because SMTP is not configured.");
    return;
  }
  try {
    await createTransport().sendMail({
      from: process.env.MAIL_FROM,
      to: STAFF_NOTIFICATION_TO,
      subject: String(subject).replace(/[\r\n]/g, " ").slice(0, 180),
      text,
    });
  } catch (error) {
    const code = error && typeof error === "object" && "code" in error ? error.code : "";
    console.error("Staff notification failed:", code || "send failed");
  }
}

export async function sendReport({ to, name, heading, filename, pdf }) {
  await createTransport().sendMail({
    from: process.env.MAIL_FROM,
    to,
    subject: `${heading} - MyAnmol`,
    text: [
      `Hello ${name},`,
      "",
      `Your ${heading} is attached. It uses the figures from the calculator and the name you entered.`,
      "",
      "This illustration is educational. Mutual fund investments are subject to market risks. Read all scheme-related documents carefully.",
      "",
      "MyAnmol",
      "ARN 114893",
      "intern.myanmol@gmail.com",
    ].join("\n"),
    attachments: [{ filename, content: pdf, contentType: "application/pdf" }],
  });
}
