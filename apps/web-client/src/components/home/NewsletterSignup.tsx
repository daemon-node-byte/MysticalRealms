import React, { useState } from "react";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    // TODO: Integrate with backend/newsletter service
  }

  return (
    <section className="w-full flex flex-col items-center py-16 px-4 bg-[var(--secondary)] bg-opacity-80 rounded-3xl shadow-lg my-8">
      <h3 className="text-2xl font-heading text-[var(--accent)] mb-4">Subscribe to the Mystical Realms Newsletter</h3>
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-center">
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Your email address"
          className="rounded px-3 py-2 border border-[var(--accent)] bg-[var(--primary)] text-[var(--text)] font-body"
          required
        />
        <button type="submit" className="bg-[var(--accent)] text-[var(--primary)] font-bold rounded px-4 py-2 shadow hover:scale-105 transition-transform">
          {submitted ? "Subscribed!" : "Subscribe"}
        </button>
      </form>
      <p className="mt-4 text-sm text-[var(--text)] opacity-70 font-body">No spam. Unsubscribe anytime.</p>
    </section>
  );
}
