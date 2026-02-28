import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const { season, email } = await req.json();

  const { data } = await supabase
    .from("actv_submissions")
    .select("status")
    .eq("season", season)
    .eq("email", email)
    .maybeSingle();

  if (data) {
    return NextResponse.json({
      exists: true,
      status: data.status,
    });
  }

  return NextResponse.json({ exists: false });
}