'use client';

import React from 'react';
import { MagicWandIcon, PersonIcon, ExitIcon } from '@radix-ui/react-icons';
import { Button, DropdownMenu } from '@radix-ui/themes';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

export const Header: React.FC = () => {
  const { signOut, isAuthenticated } = useAuth();

  return (
    <header style={{ width: '100%', padding: '1.5rem 0', background: 'var(--color-primary)', color: 'var(--color-text)', boxShadow: '0 2px 8px 0 rgba(0,0,0,0.08)', borderBottom: '1px solid var(--color-border)' }}>
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold tracking-widest font-cinzel">
          <MagicWandIcon className="w-8 h-8" style={{ color: 'var(--color-accent)' }} />
          Mystical Realms
        </Link>
        
        <nav className="flex gap-6 text-lg items-center">
          <Link href="/tarot" className="hover:text-[var(--color-accent)] transition">Tarot</Link>
          <Link href="/astrology" className="hover:text-[var(--color-accent)] transition">Astrology</Link>
          <Link href="/journal" className="hover:text-[var(--color-accent)] transition">Journal</Link>
          <Link href="/blog" className="hover:text-[var(--color-accent)] transition">Blog</Link>
          
          {isAuthenticated ? (
            <div className="flex items-center gap-4 ml-4">
              <Link 
                href="/dashboard" 
                className="bg-[var(--color-accent)] text-[var(--color-primary)] px-4 py-2 rounded font-semibold hover:bg-[var(--color-secondary)] transition"
              >
                Dashboard
              </Link>
              
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Button variant="ghost" className="p-2">
                    <PersonIcon className="w-5 h-5" />
                  </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Item>
                    <Link href="/profile" className="flex items-center gap-2">
                      <PersonIcon className="w-4 h-4" />
                      Profile
                    </Link>
                  </DropdownMenu.Item>
                  <DropdownMenu.Separator />
                  <DropdownMenu.Item onClick={signOut} className="flex items-center gap-2">
                    <ExitIcon className="w-4 h-4" />
                    Sign Out
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </div>
          ) : (
            <div className="flex gap-2 ml-4">
              <Link href="/signin" className="bg-[var(--color-accent)] text-[var(--color-primary)] px-4 py-2 rounded font-semibold hover:bg-[var(--color-secondary)] transition">Sign In</Link>
              <Link href="/signup" className="border border-[var(--color-accent)] text-[var(--color-accent)] px-4 py-2 rounded font-semibold hover:bg-[var(--color-accent)] hover:text-[var(--color-primary)] transition">Sign Up</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};
