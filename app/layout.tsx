import "./(site)/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NDO Network",
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
        {children}
      </body>
    </html>
  );
}