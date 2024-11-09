import type { Metadata } from "next";
import "@/app/globals.css";
import global from "@/app/ui/global.module.css";
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
    <body className={`${inter.className} antialiased ${global.body}`}>{children}</body>
  </html>
  );
}
