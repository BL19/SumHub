import type { Metadata } from "next";
import "./globals.css";
import "../app/ui/global.css"
import { inter } from '@/app/ui/fonts';


export const metadata: Metadata = {
  title: "Sumhub",
  description: "AI tool for literature review",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className={`${inter.className} antialiased`}>{children}</body>
  </html>
  );
}
