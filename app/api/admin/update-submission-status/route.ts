import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  try {
    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json(
        { error: "Missing id or status" },
        { status: 400 }
      );
    }

    if (!["approved", "rejected"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status value" },
        { status: 400 }
      );
    }

    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    /* ---------------------------------------
       FETCH SUBMISSION
    --------------------------------------- */

    const { data: submission, error: fetchError } =
      await supabase
        .from("actv_submissions")
        .select("*")
        .eq("id", id)
        .single();

    if (fetchError || !submission) {
      return NextResponse.json(
        { error: "Submission not found" },
        { status: 404 }
      );
    }

    /* ---------------------------------------
       PREVENT DUPLICATE UPDATE
    --------------------------------------- */

    if (submission.status === status) {
      return NextResponse.json(
        { message: "Status already set." },
        { status: 200 }
      );
    }

    /* ---------------------------------------
       UPDATE STATUS
    --------------------------------------- */

    const { error: updateError } = await supabase
      .from("actv_submissions")
      .update({ status })
      .eq("id", id);

    if (updateError) {
      console.error("Database update error:", updateError);
      return NextResponse.json(
        { error: updateError.message },
        { status: 500 }
      );
    }

    /* ---------------------------------------
       PREPARE PROFESSIONAL EMAIL
    --------------------------------------- */

    let subject = "";
    let html = "";

    if (status === "approved") {
      subject = "🎉 You're In! ACTV Island Approved";
      html = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2 style="color:#16a34a;">Congratulations!</h2>
          <p>Your island <strong>${submission.island_name}</strong> 
          has officially been approved for <strong>${submission.season}</strong>.</p>

          <p>Our team will reach out shortly with scheduling details.</p>

          <hr style="margin:20px 0;" />

          <p style="font-size:12px;color:#888;">
            ACTV – Island Edition<br/>
            Hosted by NDO
          </p>
        </div>
      `;
    }

    if (status === "rejected") {
      subject = "ACTV Submission Update";
      html = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Thank You For Submitting</h2>
          <p>Your island <strong>${submission.island_name}</strong> 
          was not selected for <strong>${submission.season}</strong>.</p>

          <p>We truly appreciate the effort and encourage you to submit again next season.</p>

          <hr style="margin:20px 0;" />

          <p style="font-size:12px;color:#888;">
            ACTV – Island Edition<br/>
            Hosted by NDO
          </p>
        </div>
      `;
    }

    /* ---------------------------------------
       SEND EMAIL (NON-BLOCKING FAILURE)
    --------------------------------------- */

    try {
      await resend.emails.send({
        from: "ACTV <noreply@ndo.network>",
        to: submission.email,
        subject,
        html,
      });
    } catch (emailError) {
      console.error("Email send failed:", emailError);
      // Do not crash the request if email fails
    }

    return NextResponse.json({ success: true });

  } catch (err: any) {
    console.error("Server crash:", err);
    return NextResponse.json(
      { error: err?.message || "Server crash" },
      { status: 500 }
    );
  }
}