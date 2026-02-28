import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET() {
  try {
    const supabaseUrl = process.env.SUPABASE_URL
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !serviceRoleKey) {
      throw new Error("Missing Supabase environment variables")
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey)

    const { data, error } = await supabase
      .from("actv_submissions")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json(
        { error: "Database query failed" },
        { status: 500 }
      )
    }

    return NextResponse.json(data ?? [])

  } catch (err: any) {
    console.error("Server crash:", err)
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    )
  }
}