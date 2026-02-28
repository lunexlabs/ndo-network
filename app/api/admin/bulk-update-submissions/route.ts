import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(req: Request) {
  try {
    // 🔒 Validate env vars inside handler
    const supabaseUrl = process.env.SUPABASE_URL
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !serviceRoleKey) {
      throw new Error("Missing Supabase environment variables")
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey)

    const { ids, action, adminEmail } = await req.json()

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { error: "No IDs provided" },
        { status: 400 }
      )
    }

    let updateData: any = {}

    switch (action) {
      case "approve":
        updateData = { status: "approved" }
        break

      case "reject":
        updateData = { status: "rejected" }
        break

      case "archive":
        updateData = { is_archived: true }
        break

      case "unarchive":
        updateData = { is_archived: false }
        break

      case "delete":
        updateData = { deleted_at: new Date().toISOString() }
        break

      case "restore":
        updateData = { deleted_at: null }
        break

      default:
        return NextResponse.json(
          { error: "Invalid action" },
          { status: 400 }
        )
    }

    const { error } = await supabase
      .from("actv_submissions")
      .update(updateData)
      .in("id", ids)

    if (error) {
      console.error("Bulk update error:", error)
      return NextResponse.json(
        { error: "Database update failed" },
        { status: 500 }
      )
    }

    /* ------------------------
       ACTIVITY LOGGING
    ------------------------- */

    if (adminEmail) {
      const { error: logError } = await supabase
        .from("admin_activity_log")
        .insert(
          ids.map((id: string) => ({
            admin_email: adminEmail,
            action,
            entity_type: "submission",
            entity_id: id,
          }))
        )

      if (logError) {
        console.error("Activity log failed:", logError)
      }
    }

    return NextResponse.json({ success: true })

  } catch (err) {
    console.error("Bulk update crash:", err)
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    )
  }
}