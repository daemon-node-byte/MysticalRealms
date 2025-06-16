"use client";
import React, { useEffect } from "react";
import { HeroSection } from "../components/home/HeroSection";
import { ServicesSection } from "../components/home/ServicesSection";
import { FeaturedSection } from "../components/home/FeaturedSection";
import { TestimonialsSection } from "../components/home/TestimonialsSection";
import { MiniHoroscopeTeaser } from "../components/home/MiniHoroscopeTeaser";
import { NewsletterSignup } from "../components/home/NewsletterSignup";
import { useThemeStore } from "@/store/themeStore";

export default function Home() {
  const theme = useThemeStore((s) => s.theme);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme]);

  return (
    <main className="min-h-screen w-full bg-[var(--background)] text-[var(--text)] font-sans overflow-x-hidden">
      <HeroSection />
      <div className="flex justify-center -mt-12 mb-8">
        <span className="animate-bounce text-[var(--accent)] text-4xl">⌄</span>
      </div>
      <MiniHoroscopeTeaser />
      <ServicesSection />
      <FeaturedSection />
      <TestimonialsSection />
      <NewsletterSignup />
    </main>
  );
}
