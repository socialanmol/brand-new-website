import nodemailer from "nodemailer";

export function mailConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.MAIL_FROM);
}

export async function sendReport({ to, name, heading, filename, pdf }) {
  const port = Number(process.env.SMTP_PORT || 587);
  const auth = process.env.SMTP_USER
    ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS || "" }
    : undefined;
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth,
  });
  await transporter.sendMail({
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
      "mutualfunds@myanmol.com",
    ].join("\n"),
    attachments: [{ filename, content: pdf, contentType: "application/pdf" }],
  });
}
