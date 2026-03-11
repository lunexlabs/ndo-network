import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(req: Request) {
  try {

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !serviceRoleKey) {
      throw new Error("Supabase environment variables missing")
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey)

    const body = await req.json()

    const { season, email } = body

    if (!season || !email) {
      return NextResponse.json(
        { error: "Missing season or email" },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from("actv_submissions")
      .select("status")
      .eq("season", season)
      .eq("email", email)
      .maybeSingle()

    if (error) {
      console.error("Supabase error:", error)
      throw error
    }

    if (data) {
      return NextResponse.json({
        exists: true,
        status: data.status
      })
    }

    return NextResponse.json({ exists: false })

  } catch (err) {
    console.error("Check API error:", err)

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}