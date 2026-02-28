import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendSubmissionEmail(email: string, islandName: string) {
  await resend.emails.send({
    from: "ACTV <noreply@ndo.network>",
    to: email,
    subject: "Your ACTV Submission Was Received",
    html: `
      <h2>Submission Received</h2>
      <p>Your island "<strong>${islandName}</strong>" has been successfully submitted.</p>
      <p>Status: <strong>Pending Review</strong></p>
      <p>We’ll contact you via email if selected.</p>
    `,
  });
}