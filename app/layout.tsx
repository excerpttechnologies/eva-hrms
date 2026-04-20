import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NexusHR - Enterprise HRMS Suite",
  description: "The most powerful HR management system for modern enterprises",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
