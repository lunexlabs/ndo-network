import "./globals.css";
import type { Metadata } from "next";
import NetworkLayout from "../src/components/layout/NetworkLayout";

export const metadata: Metadata = {
  title: "NDO",
  description: "Official network platform for NDO shows and gaming series",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <NetworkLayout>{children}</NetworkLayout>
      </body>
    </html>
  );
}