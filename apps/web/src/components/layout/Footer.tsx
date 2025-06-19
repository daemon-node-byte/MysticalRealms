import React from 'react';
import { InstagramLogoIcon, TwitterLogoIcon, DiscordLogoIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

export const Footer: React.FC = () => (
  <footer style={{ width: '100%', padding: '2rem 0', background: 'var(--color-primary)', color: 'var(--color-text)', borderTop: '1px solid var(--color-border)' }}>
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4">
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
        <Link href="/about" className="hover:text-[var(--color-accent)] transition">About</Link>
        <Link href="/blog" className="hover:text-[var(--color-accent)] transition">Blog</Link>
        <Link href="/faq" className="hover:text-[var(--color-accent)] transition">FAQ</Link>
        <Link href="/contact" className="hover:text-[var(--color-accent)] transition">Contact</Link>
        <Link href="/privacy" className="hover:text-[var(--color-accent)] transition">Privacy</Link>
        <Link href="/terms" className="hover:text-[var(--color-accent)] transition">Terms</Link>
      </div>
      <div className="flex gap-4 items-center">
        <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><InstagramLogoIcon className="w-6 h-6 hover:text-[var(--color-accent)] transition" /></a>
        <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer"><TwitterLogoIcon className="w-6 h-6 hover:text-[var(--color-accent)] transition" /></a>
        <a href="https://discord.com" aria-label="Discord" target="_blank" rel="noopener noreferrer"><DiscordLogoIcon className="w-6 h-6 hover:text-[var(--color-accent)] transition" /></a>
      </div>
      <div className="flex gap-2 items-center">
        <input type="email" placeholder="Your email" className="rounded px-3 py-1 bg-[var(--color-primary)] text-[var(--color-text)] border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" disabled />
        <button type="button" className="bg-[var(--color-accent)] text-[var(--color-primary)] rounded px-4 py-1 font-semibold hover:bg-[var(--color-secondary)] transition" disabled>Subscribe</button>
      </div>
    </div>
    <div className="text-center text-xs text-[var(--color-accent)] mt-4">© {new Date().getFullYear()} Mystical Realms. All rights reserved.</div>
  </footer>
);
