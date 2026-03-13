import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { createClient as createServerClient } from "@/src/lib/supabase/server"

export async function POST(req: Request) {
  try {

    /* ---------------------------------------
       VERIFY ADMIN USER
    --------------------------------------- */

    const authClient = await createServerClient()

    const {
      data: { user },
    } = await authClient.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { data: profile } = await authClient
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single()

    if (!profile || (profile.role !== "admin" && profile.role !== "owner")) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      )
    }

    /* ---------------------------------------
       REQUEST DATA
    --------------------------------------- */

    const { id } = await req.json()

    if (!id) {
      return NextResponse.json(
        { error: "Submission ID is required" },
        { status: 400 }
      )
    }

    /* ---------------------------------------
       ENV VARIABLES
    --------------------------------------- */

    const supabaseUrl = process.env.SUPABASE_URL
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !serviceRoleKey) {
      throw new Error("Missing Supabase environment variables")
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey)

    /* ---------------------------------------
       ARCHIVE SUBMISSION
    --------------------------------------- */

    const { error } = await supabase
      .from("actv_submissions")
      .update({ is_archived: true })
      .eq("id", id)

    if (error) {
      console.error("Archive error:", error)

      return NextResponse.json(
        { error: "Database update failed" },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })

  } catch (err) {
    console.error("Archive route crash:", err)

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    )
  }
}