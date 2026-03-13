import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

const PROTECTED_ROUTES = [
  "/account",
  "/ndo-admin-portal",
  "/workspace/admin",
];

const AUTH_ROUTES = [
  "/auth",
  "/workspace/login",
];

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request,
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return response;
  }

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },

        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });

          response = NextResponse.next({
            request,
          });

          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  const isAuthRoute = AUTH_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  /* ------------------------------------
     BLOCK PROTECTED ROUTES
  ------------------------------------ */

  if (isProtectedRoute && !user) {
    const redirectUrl = request.nextUrl.clone();

    if (pathname.startsWith("/workspace")) {
      redirectUrl.pathname = "/workspace/login";
    } else {
      redirectUrl.pathname = "/auth";
    }

    redirectUrl.searchParams.set(
      "message",
      "Please log in to continue."
    );

    return NextResponse.redirect(redirectUrl);
  }

  /* ------------------------------------
     BLOCK AUTH PAGE IF ALREADY LOGGED IN
  ------------------------------------ */

  if (isAuthRoute && user) {
    const redirectUrl = request.nextUrl.clone();

    if (pathname.startsWith("/workspace")) {
      redirectUrl.pathname = "/workspace/admin";
    } else {
      redirectUrl.pathname = "/account";
    }

    redirectUrl.searchParams.delete("message");

    return NextResponse.redirect(redirectUrl);
  }

  return response;
}