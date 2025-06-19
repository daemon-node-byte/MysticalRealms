import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
        style={{
          background: 'var(--color-background)',
          color: 'var(--color-text)',
          '--color-primary': '#2C003E',
          '--color-secondary': '#4B1E6B',
          '--color-accent': '#9D4EDD',
          '--color-text': '#F5E8FF',
          '--color-background': '#0F0014',
          '--color-border': '#4B1E6B',
          '--color-card': '#2C003E',
        } as React.CSSProperties}
      >
        <Theme >

        <Header />
        <main className="flex-1 flex flex-col items-center justify-center">
          {children}
        </main>
        <Footer />
        </Theme>
      </body>
    </html>
  );
}
