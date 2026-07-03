import { Resend } from "resend";

const FROM = "Daniel Černý <portfolio@djt-group.com>";
const TO_EMAIL = "djt.goddaddy@gmail.com";

export async function POST(request: Request) {
  let body: { name?: string; email?: string; message?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const message = body.message?.trim();

  if (!name || !email || !message) {
    return Response.json(
      { error: "Name, email and message are required" },
      { status: 400 }
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  // notification to site owner
  const { error } = await resend.emails.send({
    from: FROM,
    to: TO_EMAIL,
    replyTo: email,
    subject: `Portfolio contact from ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
  });

  if (error) {
    return Response.json({ error: error.message }, { status: 502 });
  }

  // confirmation to the visitor — best-effort, don't fail the request over it
  await resend.emails.send({
    from: FROM,
    to: email,
    subject: "I got your message — Daniel Černý",
    text: `Hi ${name},\n\nthanks for reaching out — your message has been received and I'll get back to you as soon as I can.\n\nYour message:\n${message}\n\n— Daniel Černý\ndaniel.djt-group.com`,
  });

  return Response.json({ ok: true });
}
