import React from 'react';
import { Button } from '@radix-ui/themes';

export const HeroSection: React.FC = () => (
  <section className="w-full min-h-[60vh] flex flex-col items-center justify-center text-center py-16 relative overflow-hidden bg-gradient-to-b from-[#2C003E] to-[#0F0014]">
    {/* Starfield or Nebula background could be a canvas or animated SVG here */}
    <h1 className="text-5xl md:text-6xl font-cinzel font-bold mb-4 tracking-tight drop-shadow-lg">Welcome to Mystical Realms</h1>
    <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-8 text-[#9D4EDD] font-medium">Explore Tarot, Astrology & More. AI-powered readings, interactive 3D spreads, and a mystical journey await you.</p>
    <Button size="4" className="bg-[#9D4EDD] text-[#0F0014] font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-[#4B1E6B] transition-all text-xl">Get Your Free Reading</Button>
    {/* Optionally, add animated stars or a subtle nebula effect here */}
  </section>
);
