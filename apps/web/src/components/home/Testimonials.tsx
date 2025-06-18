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
  <section className="w-full py-16 bg-[#2C003E]">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-cinzel font-bold mb-8 text-[#9D4EDD]">What Our Users Say</h2>
      <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
        {testimonials.map((t) => (
          <div key={t.name} className="bg-[#1A1A2E] border border-[#4B1E6B] rounded-xl p-6 shadow-lg flex-1 flex flex-col justify-between">
            <p className="text-lg italic mb-4 text-[#F5E8FF]">“{t.quote}”</p>
            <div className="text-[#9D4EDD] font-semibold">— {t.name}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
