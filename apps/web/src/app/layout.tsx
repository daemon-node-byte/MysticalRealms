import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mystical Realms",
  description:
    "Explore Tarot, Astrology & More – AI-powered readings, 3D spreads, and a mystical journey.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-gradient-to-b from-[#0F0014] to-[#2C003E] text-[#F5E8FF]`}>
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center px-4">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
