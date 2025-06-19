import React from 'react';
import { MagicWandIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

export const Header: React.FC = () => (
  <header style={{ width: '100%', padding: '1.5rem 0', background: 'var(--color-primary)', color: 'var(--color-text)', boxShadow: '0 2px 8px 0 rgba(0,0,0,0.08)', borderBottom: '1px solid var(--color-border)' }}>
    <div className="max-w-6xl mx-auto flex items-center justify-between px-4">
      <Link href="/" className="flex items-center gap-2 text-2xl font-bold tracking-widest font-cinzel">
        <MagicWandIcon className="w-8 h-8" style={{ color: 'var(--color-accent)' }} />
        Mystical Realms
      </Link>
      <nav className="flex gap-6 text-lg">
        <Link href="/tarot" className="hover:text-[var(--color-accent)] transition">Tarot</Link>
        <Link href="/astrology" className="hover:text-[var(--color-accent)] transition">Astrology</Link>
        <Link href="/journal" className="hover:text-[var(--color-accent)] transition">Journal</Link>
        <Link href="/blog" className="hover:text-[var(--color-accent)] transition">Blog</Link>
        <Link href="/signin" className="ml-4 bg-[var(--color-accent)] text-[var(--color-primary)] px-4 py-1 rounded font-semibold hover:bg-[var(--color-secondary)] transition">Sign In</Link>
        <Link href="/signup" className="ml-2 border border-[var(--color-accent)] text-[var(--color-accent)] px-4 py-1 rounded font-semibold hover:bg-[var(--color-accent)] hover:text-[var(--color-primary)] transition">Sign Up</Link>
      </nav>
    </div>
  </header>
);
