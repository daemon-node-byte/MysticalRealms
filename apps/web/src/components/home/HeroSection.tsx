import React from 'react';
import { Button, Text, Heading, Section } from '@radix-ui/themes';

export const HeroSection: React.FC = () => (
  <Section className="w-full min-h-[60vh] flex flex-col items-center justify-center text-center py-16 relative overflow-hidden" style={{ background: 'linear-gradient(to bottom, var(--color-primary), var(--color-background))' }}>
    {/* Starfield or Nebula background could be a canvas or animated SVG here */}
    <Heading size="9" className="font-cinzel font-bold mb-4 tracking-tight drop-shadow-lg">Welcome to Mystical Realms</Heading>
    <Text className="text-xl md:text-2xl max-w-2xl mx-auto mb-8 font-medium" style={{ color: 'var(--color-accent)' }}>Explore Tarot, Astrology & More. AI-powered readings, interactive 3D spreads, and a mystical journey await you.</Text>
    <Button size="4" className="font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-[var(--color-secondary)] transition-all text-xl" style={{ background: 'var(--color-accent)', color: 'var(--color-primary)' }}>Get Your Free Reading</Button>
    {/* Optionally, add animated stars or a subtle nebula effect here */}
  </Section>
);
