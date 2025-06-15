import * as React from "react";
import { Button } from "@radix-ui/themes";

export function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center py-32 px-4 text-center bg-gradient-to-b from-indigo-900 to-indigo-700 parallax-section mb-16">
      <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">Welcome to Mystical Realms</h1>
      <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto opacity-90">Unlock the secrets of the arcane, discover enchanted services, and transform your journey with our mystical expertise.</p>
      <Button asChild size="4" color="crimson" radius="full">
        <a href="#services">Get Started</a>
      </Button>
    </section>
  );
}
