import React from 'react';
import { MagicWandIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

export const Header: React.FC = () => (
  <header className="w-full py-6 bg-[#2C003E] text-[#F5E8FF] shadow-lg border-b border-[#4B1E6B]">
    <div className="max-w-6xl mx-auto flex items-center justify-between px-4">
      <Link href="/" className="flex items-center gap-2 text-2xl font-bold tracking-widest font-cinzel">
        <MagicWandIcon className="w-8 h-8 text-[#9D4EDD]" />
        Mystical Realms
      </Link>
      <nav className="flex gap-6 text-lg">
        <Link href="/tarot" className="hover:text-[#9D4EDD] transition">Tarot</Link>
        <Link href="/astrology" className="hover:text-[#9D4EDD] transition">Astrology</Link>
        <Link href="/journal" className="hover:text-[#9D4EDD] transition">Journal</Link>
        <Link href="/blog" className="hover:text-[#9D4EDD] transition">Blog</Link>
        <Link href="/login" className="ml-4 bg-[#9D4EDD] text-[#0F0014] px-4 py-1 rounded font-semibold hover:bg-[#4B1E6B] transition">Sign In</Link>
      </nav>
    </div>
  </header>
);
