import { ReactNode } from "react";
import Navbar from "@/src/components/layout/Navbar";
import Footer from "@/src/components/layout/Footer";

interface Props {
  children: ReactNode;
}

export default function SiteLayout({ children }: Props) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}