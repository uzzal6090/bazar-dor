import type { Metadata } from "next";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "বাজার দর | প্রয়োজনীয় পণ্যের দাম",
  description: "প্রয়োজনীয় পণ্যের আজকের দাম এক নজরে দেখুন।",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" data-theme="light">
      <body className="flex min-h-screen flex-col">
        <Suspense fallback={<div className="h-28 bg-white" />}>
  <Header />
</Suspense>
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}