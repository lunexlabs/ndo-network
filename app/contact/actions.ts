"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

function resolveRecipient(category: string) {
  switch (category) {
    case "Business / Sponsorship":
      return "press@ndo.network";
    case "Collaboration":
      return "actv@ndo.network";
    case "General Message":
      return "hello@ndo.network";
    default:
      return "support@ndo.network";
  }
}

export async function submitContact(formData: FormData) {
  const name = formData.get("name")?.toString();
  const email = formData.get("email")?.toString();
  const category = formData.get("category")?.toString();
  const message = formData.get("message")?.toString();

  if (!name || !email || !category || !message) {
    return { error: "All fields are required." };
  }

  const recipient = resolveRecipient(category);

  try {
    /* --------------------------
       SEND TO NDO TEAM
    --------------------------- */
    await resend.emails.send({
      from: "NDO Network <ndo@ndo.network>",
      to: recipient,
      subject: `New ${category} Inquiry`,
      replyTo: email,
      html: `
        <h2>New Contact Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Category:</strong> ${category}</p>
        <hr />
        <p>${message}</p>
      `,
    });

    /* --------------------------
       SEND CONFIRMATION TO USER
    --------------------------- */
    await resend.emails.send({
      from: "NDO Network <hello@ndo.network>",
      to: email,
      subject: "We Received Your Message",
      html: `
        <h2>Thanks for reaching out, ${name} 👋</h2>
        <p>We received your message regarding:</p>
        <p><strong>${category}</strong></p>
        <br />
        <p>Our team will respond shortly.</p>
        <br />
        <p>— NDO Network</p>
      `,
    });

    return { success: true };

  } catch (err) {
    console.error("Contact form error:", err);
    return { error: "Something went wrong. Please try again." };
  }
}