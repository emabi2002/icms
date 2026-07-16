import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ICAC Electronic Case Management System",
  description: "Database-free prototype for ICAC Papua New Guinea.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
