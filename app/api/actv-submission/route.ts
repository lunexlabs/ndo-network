import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { Resend } from "resend"

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "")
}

export async function POST(req: Request) {
  try {
    console.log("ACTV submission started")

    /* ----------------------------------
       ENVIRONMENT CHECK
    ---------------------------------- */

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    const resendKey = process.env.RESEND_API_KEY

    if (!supabaseUrl || !serviceRoleKey) {
      console.error("Missing Supabase env variables")
      throw new Error("Missing Supabase environment variables")
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey)
    const resend = resendKey ? new Resend(resendKey) : null

    const formData = await req.formData()

    const season = formData.get("season") as string
    const islandName = formData.get("island_name") as string
    const creatorName = formData.get("creator_name") as string
    const email = formData.get("email") as string

    if (!season || !islandName || !creatorName || !email) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      )
    }

    /* ----------------------------------
       CHECK DUPLICATE
    ---------------------------------- */

    const { data: existing } = await supabase
      .from("actv_submissions")
      .select("id, status")
      .eq("season", season)
      .eq("email", email)
      .maybeSingle()

    if (existing) {
      return NextResponse.json(
        {
          error: "You already submitted for this season.",
          status: existing.status
        },
        { status: 400 }
      )
    }

    /* ----------------------------------
       UPLOAD SCREENSHOTS
    ---------------------------------- */

    const screenshots = (formData.getAll("screenshots") || []) as File[]
    const uploadedUrls: string[] = []

    const seasonSlug = slugify(season)
    const creatorSlug = slugify(creatorName)
    const islandSlug = slugify(islandName)

    for (const file of screenshots) {

      if (!file || file.size === 0) continue

      const arrayBuffer = await file.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      const fileName = `${Date.now()}-${slugify(file.name)}`
      const filePath = `${seasonSlug}/${creatorSlug}/${islandSlug}/${fileName}`

      const { error } = await supabase.storage
        .from("actv-submissions")
        .upload(filePath, buffer, {
          contentType: file.type,
          upsert: false
        })

      if (error) {
        console.error("Upload error:", error)
        throw error
      }

      const { data } = supabase.storage
        .from("actv-submissions")
        .getPublicUrl(filePath)

      uploadedUrls.push(data.publicUrl)
    }

    /* ----------------------------------
       INSERT DATABASE RECORD
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
      created_at: new Date().toISOString()
    }

    const { error: insertError } = await supabase
      .from("actv_submissions")
      .insert([submission])

    if (insertError) {
      console.error("Insert error:", insertError)
      throw insertError
    }

    /* ----------------------------------
       EMAIL CONFIRMATION
    ---------------------------------- */

    if (resend) {
      try {
        await resend.emails.send({
          from: "ACTV <noreply@ndo.network>",
          to: email,
          subject: "ACTV Submission Received",
          html: `
            <h2>Submission Received 🎉</h2>
            <p>Your island "<strong>${islandName}</strong>" has been submitted for <strong>${season}</strong>.</p>
            <p>Status: Pending Review</p>
          `
        })
      } catch (emailError) {
        console.error("Email failed:", emailError)
      }
    }

    /* ----------------------------------
       DISCORD WEBHOOK
    ---------------------------------- */

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL

    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
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
                  { name: "Email", value: email }
                ],
                timestamp: new Date().toISOString()
              }
            ]
          })
        })
      } catch (discordError) {
        console.error("Discord webhook failed:", discordError)
      }
    }

    return NextResponse.json({ success: true })

  } catch (err) {
    console.error("Submission error:", err)

    return NextResponse.json(
      { error: "Server error during submission." },
      { status: 500 }
    )
  }
}