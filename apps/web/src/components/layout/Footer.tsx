import React from 'react';
import { InstagramLogoIcon, TwitterLogoIcon, DiscordLogoIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

export const Footer: React.FC = () => (
  <footer className="w-full py-8 bg-[#1A1A2E] text-[#F5E8FF] border-t border-[#4B1E6B]">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4">
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
        <Link href="/about" className="hover:text-[#9D4EDD] transition">About</Link>
        <Link href="/blog" className="hover:text-[#9D4EDD] transition">Blog</Link>
        <Link href="/faq" className="hover:text-[#9D4EDD] transition">FAQ</Link>
        <Link href="/contact" className="hover:text-[#9D4EDD] transition">Contact</Link>
        <Link href="/privacy" className="hover:text-[#9D4EDD] transition">Privacy</Link>
        <Link href="/terms" className="hover:text-[#9D4EDD] transition">Terms</Link>
      </div>
      <div className="flex gap-4 items-center">
        <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><InstagramLogoIcon className="w-6 h-6 hover:text-[#9D4EDD] transition" /></a>
        <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer"><TwitterLogoIcon className="w-6 h-6 hover:text-[#9D4EDD] transition" /></a>
        <a href="https://discord.com" aria-label="Discord" target="_blank" rel="noopener noreferrer"><DiscordLogoIcon className="w-6 h-6 hover:text-[#9D4EDD] transition" /></a>
      </div>
      <div className="flex gap-2 items-center">
        <input type="email" placeholder="Your email" className="rounded px-3 py-1 bg-[#2C003E] text-[#F5E8FF] border border-[#4B1E6B] focus:outline-none focus:ring-2 focus:ring-[#9D4EDD]" disabled />
        <button type="button" className="bg-[#9D4EDD] text-[#0F0014] rounded px-4 py-1 font-semibold hover:bg-[#4B1E6B] transition" disabled>Subscribe</button>
      </div>
    </div>
    <div className="text-center text-xs text-[#9D4EDD] mt-4">© {new Date().getFullYear()} Mystical Realms. All rights reserved.</div>
  </footer>
);
