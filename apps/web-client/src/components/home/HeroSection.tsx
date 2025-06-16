import * as React from "react";
import { Button } from "@radix-ui/themes";

export function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center py-32 px-4 text-center bg-[var(--primary)] bg-gradient-to-b from-[var(--primary)] to-[var(--secondary)] parallax-section mb-16 rounded-3xl shadow-2xl">
      <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg font-heading">Welcome to Mystical Realms</h1>
      <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto opacity-90 font-body">Explore Tarot, Astrology & More — AI-powered readings, interactive 3D spreads, and mystical insight await you.</p>
      <Button asChild size="4" color="crimson" radius="full" className="bg-[var(--accent)] text-[var(--text)] shadow-lg hover:scale-105 transition-transform">
        <a href="#services">Get Your Free Reading</a>
      </Button>
    </section>
  );
}
