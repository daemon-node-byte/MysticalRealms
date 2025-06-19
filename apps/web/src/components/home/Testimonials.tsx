import React from 'react';

const testimonials = [
  {
    quote: 'Mystical Realms gave me the most insightful tarot reading I’ve ever had. The 3D spreads are magical!',
    name: 'Ava L.',
  },
  {
    quote: 'The astrology charts are spot on and the interface is stunning. I love the community journal!',
    name: 'Leo S.',
  },
  {
    quote: 'Dice divination is so fun and surprisingly accurate. Highly recommend for anyone curious about the mystical arts.',
    name: 'Maya R.',
  },
];

export const Testimonials: React.FC = () => (
  <section className="w-full py-16" style={{ background: 'var(--color-primary)' }}>
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-cinzel font-bold mb-8" style={{ color: 'var(--color-accent)' }}>What Our Users Say</h2>
      <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
        {testimonials.map((t) => (
          <div key={t.name} className="rounded-xl p-6 shadow-lg flex-1 flex flex-col justify-between" style={{ background: 'var(--color-primary)', border: '1px solid var(--color-border)' }}>
            <p className="text-lg italic mb-4" style={{ color: 'var(--color-text)' }}>“{t.quote}”</p>
            <div style={{ color: 'var(--color-accent)' }} className="font-semibold">— {t.name}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
