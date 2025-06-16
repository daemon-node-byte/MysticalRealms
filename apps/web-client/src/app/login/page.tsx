"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    // TODO: Integrate with Supabase or backend auth
    setTimeout(() => {
      setLoading(false);
      setError("Invalid credentials (demo only)");
    }, 1000);
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[var(--background)] text-[var(--text)] font-sans">
      <section className="w-full max-w-md bg-[var(--primary)] bg-opacity-90 rounded-3xl shadow-2xl p-10 flex flex-col items-center">
        <h1 className="text-3xl font-heading text-[var(--accent)] mb-6">Sign In</h1>
        <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            ref={emailRef}
            className="rounded px-4 py-2 border border-[var(--accent)] bg-[var(--secondary)] text-[var(--text)] font-body focus:scale-105 transition-transform"
            required
          />
          <input
            type="password"
            placeholder="Password"
            ref={passwordRef}
            className="rounded px-4 py-2 border border-[var(--accent)] bg-[var(--secondary)] text-[var(--text)] font-body focus:scale-105 transition-transform"
            required
          />
          <button
            type="submit"
            className="bg-[var(--accent)] text-[var(--primary)] font-bold rounded px-4 py-2 shadow hover:scale-105 transition-transform"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
          {error && <div className="text-red-400 text-sm text-center mt-2">{error}</div>}
        </form>
        <div className="mt-6 text-sm text-[var(--text)] opacity-80">
          New to Mystical Realms?{' '}
          <Link href="/signup" className="text-[var(--accent)] underline font-bold">Create an account</Link>
        </div>
      </section>
    </main>
  );
}