import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY!);

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "");
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const season = formData.get("season") as string;
    const islandName = formData.get("island_name") as string;
    const creatorName = formData.get("creator_name") as string;
    const email = formData.get("email") as string;

    if (!season || !islandName || !creatorName || !email) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    /* ----------------------------------
       CHECK DUPLICATE
    ---------------------------------- */

    const { data: existing } = await supabase
      .from("actv_submissions")
      .select("id, status")
      .eq("season", season)
      .eq("email", email)
      .maybeSingle();

    if (existing) {
      return NextResponse.json(
        {
          error: "You have already submitted for this season.",
          status: existing.status,
        },
        { status: 400 }
      );
    }

    /* ----------------------------------
       UPLOAD SCREENSHOTS
    ---------------------------------- */

    const screenshots = formData.getAll("screenshots") as File[];
    const uploadedUrls: string[] = [];

    const seasonSlug = slugify(season);
    const creatorSlug = slugify(creatorName);
    const islandSlug = slugify(islandName);

    for (let file of screenshots) {
      const fileName = `${Date.now()}-${slugify(file.name)}`;
      const filePath = `${seasonSlug}/${creatorSlug}/${islandSlug}/${fileName}`;

      const { error } = await supabase.storage
        .from("actv-submissions")
        .upload(filePath, file, { upsert: false });

      if (error) throw error;

      const { data } = supabase.storage
        .from("actv-submissions")
        .getPublicUrl(filePath);

      uploadedUrls.push(data.publicUrl);
    }

    /* ----------------------------------
       INSERT INTO DATABASE
    ---------------------------------- */

    const submission = {
      season,
      island_name: islandName,
      dream_address: formData.get("dream_address"),
      theme: formData.get("theme"),
      description: formData.get("description"),
      creator_name: creatorName,
      discord: formData.get("discord"),
      email,
      screenshots: uploadedUrls,
      status: "pending",
      created_at: new Date(),
    };

    const { error: insertError } = await supabase
      .from("actv_submissions")
      .insert([submission]);

    if (insertError) {
      if (insertError.code === "23505") {
        return NextResponse.json(
          { error: "You have already submitted for this season." },
          { status: 400 }
        );
      }
      throw insertError;
    }

    /* ----------------------------------
       EMAIL CONFIRMATION
    ---------------------------------- */

    try {
      await resend.emails.send({
        from: "ACTV <noreply@ndo.network>", // MUST MATCH VERIFIED DOMAIN
        to: email,
        subject: "Your ACTV Submission Was Received",
        html: `
          <h2>Submission Received 🎉</h2>
          <p>Your island "<strong>${islandName}</strong>" has been submitted for <strong>${season}</strong>.</p>
          <p>Status: <strong>Pending Review</strong></p>
          <p>We’ll reach out if selected.</p>
        `,
      });

      console.log("Email sent to:", email);
    } catch (emailError) {
      console.error("Email failed:", emailError);
    }

    /* ----------------------------------
       DISCORD WEBHOOK
    ---------------------------------- */

    if (process.env.DISCORD_WEBHOOK_URL) {
      try {
        await fetch(process.env.DISCORD_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            embeds: [
              {
                title: "🏝️ New ACTV Submission",
                color: 16753920,
                fields: [
                  { name: "Island", value: islandName },
                  { name: "Season", value: season },
                  { name: "Creator", value: creatorName },
                  { name: "Email", value: email },
                  { name: "Status", value: "Pending" },
                ],
                timestamp: new Date().toISOString(),
              },
            ],
          }),
        });

        console.log("Discord webhook sent.");
      } catch (discordError) {
        console.error("Discord webhook failed:", discordError);
      }
    }

    return NextResponse.json({ success: true });

  } catch (err: any) {
    console.error("Submission error:", err);
    return NextResponse.json(
      { error: "Server error during submission." },
      { status: 500 }
    );
  }
}