import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { updateSession } from "@/src/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const url = request.nextUrl.clone();

  const pathname = url.pathname;

  /* ------------------------------------
     WORKSPACE SUBDOMAIN ROUTING
  ------------------------------------ */

  const isWorkspaceHost =
    host.startsWith("workspace.ndo.network") ||
    host.startsWith("workspace.localhost");

  if (isWorkspaceHost) {
    // prevent double rewriting
    if (!pathname.startsWith("/workspace")) {
      url.pathname = `/workspace${pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  /* ------------------------------------
     SUPABASE SESSION HANDLING
  ------------------------------------ */

  return updateSession(request);
}

export const config = {
  matcher: [
    /*
      Run middleware on everything except static files
    */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4|webm)$).*)",
  ],
};