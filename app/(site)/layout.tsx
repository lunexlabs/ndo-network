import { ReactNode } from "react";
import Navbar from "@/src/components/layout/Navbar";
import Footer from "@/src/components/layout/Footer";
import { createClient } from "@/src/lib/supabase/server";

interface Props {
  children: ReactNode;
}

export default async function SiteLayout({ children }: Props) {

  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <>
      <Navbar initialSession={session} />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}