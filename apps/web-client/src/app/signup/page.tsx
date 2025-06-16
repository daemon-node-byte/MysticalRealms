"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";

export default function SignupPage() {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSignup(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError(null);
        const password = passwordRef.current?.value || "";
        const confirm = confirmRef.current?.value || "";
        if (password !== confirm) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }
        // TODO: Integrate with Supabase or backend auth
        setTimeout(() => {
            setLoading(false);
            setError("Signup not implemented (demo only)");
        }, 1000);
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-[var(--background)] text-[var(--text)] font-sans">
            <section className="w-full max-w-md bg-[var(--primary)] bg-opacity-90 rounded-3xl shadow-2xl p-10 flex flex-col items-center">
                <h1 className="text-3xl font-heading text-[var(--accent)] mb-6">Create Account</h1>
                <form onSubmit={handleSignup} className="w-full flex flex-col gap-4">
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
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        ref={confirmRef}
                        className="rounded px-4 py-2 border border-[var(--accent)] bg-[var(--secondary)] text-[var(--text)] font-body focus:scale-105 transition-transform"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-[var(--accent)] text-[var(--primary)] font-bold rounded px-4 py-2 shadow hover:scale-105 transition-transform"
                        disabled={loading}
                    >
                        {loading ? "Creating Account..." : "Sign Up"}
                    </button>
                    {error && <div className="text-red-400 text-sm text-center mt-2">{error}</div>}
                </form>
                <div className="mt-6 text-sm text-[var(--text)] opacity-80">
                    Already have an account?{' '}
                    <Link href="/login" className="text-[var(--accent)] underline font-bold">Sign in</Link>
                </div>
            </section>
        </main>
    );
}