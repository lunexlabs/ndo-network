import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(req: Request) {
  try {
    const { id } = await req.json()

    if (!id) {
      return NextResponse.json(
        { error: "Missing submission ID" },
        { status: 400 }
      )
    }

    const supabaseUrl = process.env.SUPABASE_URL
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !serviceRoleKey) {
      throw new Error("Missing Supabase environment variables")
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey)

    const { error } = await supabase
      .from("actv_submissions")
      .update({ is_archived: false })
      .eq("id", id)

    if (error) {
      console.error("Unarchive error:", error)
      return NextResponse.json(
        { error: "Database update failed" },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })

  } catch (err) {
    console.error("Unarchive route crashed:", err)
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    )
  }
}