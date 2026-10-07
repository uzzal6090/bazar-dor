
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "বাজার দর | প্রয়োজনীয় পণ্যের দাম",
  description:
    "প্রয়োজনীয় পণ্যের আজকের দাম এক নজরে দেখুন।",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}