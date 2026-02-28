import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(req: Request) {
  try {
    const { id, status } = await req.json()

    if (!id || !status) {
      return NextResponse.json(
        { error: "Missing id or status" },
        { status: 400 }
      )
    }

    if (!["approved", "rejected"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status" },
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
      .from("fan_wall_messages")
      .update({ status })
      .eq("id", id)

    if (error) {
      console.error("Fan wall status update error:", error)
      return NextResponse.json(
        { error: "Database update failed" },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })

  } catch (err: any) {
    console.error("Fan wall status route crash:", err)
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    )
  }
}