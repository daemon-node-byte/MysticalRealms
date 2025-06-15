import React from "react";
import { HeroSection } from "../components/home/HeroSection";
import { ServicesSection } from "../components/home/ServicesSection";
import { FeaturedSection } from "../components/home/FeaturedSection";
import { TestimonialsSection } from "../components/home/TestimonialsSection";

export default function Home() {
  return (
    <>
      <style>{`
        .parallax-section {
          background-attachment: fixed;
          background-size: cover;
          background-position: center;
        }
      `}</style>
      <main className="min-h-screen w-full bg-gradient-to-b from-indigo-900 to-indigo-700 text-white font-sans overflow-x-hidden">
        <HeroSection />
        <ServicesSection />
        <FeaturedSection />
        <TestimonialsSection />
      </main>
    </>
  );
}
