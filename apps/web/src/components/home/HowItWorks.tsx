import React from 'react';

const steps = [
  {
    step: 1,
    label: 'Sign Up',
    desc: 'Create your free account to unlock the mystical realms.'
  },
  {
    step: 2,
    label: 'Choose a Service',
    desc: 'Pick Tarot, Astrology, or Dice to begin your journey.'
  },
  {
    step: 3,
    label: 'Receive Insight',
    desc: 'Get personalized, AI-powered guidance and cosmic wisdom.'
  }
];

export const HowItWorks: React.FC = () => (
  <section className="w-full py-16 bg-gradient-to-b from-[#1A1A2E] to-[#2C003E]">
    <div className="max-w-4xl mx-auto flex flex-col items-center">
      <h2 className="text-3xl md:text-4xl font-cinzel font-bold mb-8 text-[#9D4EDD]">How It Works</h2>
      <div className="flex flex-col md:flex-row gap-8 w-full justify-center">
        {steps.map((s, i) => (
          <div key={s.step} className="flex flex-col items-center bg-[#1A1A2E] border border-[#4B1E6B] rounded-xl p-6 shadow-lg w-full md:w-1/3">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#9D4EDD] text-[#0F0014] text-2xl font-bold mb-4 shadow-md">{s.step}</div>
            <h3 className="text-xl font-semibold mb-2 font-cinzel">{s.label}</h3>
            <p className="text-[#F5E8FF] text-center">{s.desc}</p>
            {i < steps.length - 1 && <div className="hidden md:block h-8 border-l-2 border-dashed border-[#9D4EDD] my-4" />}
          </div>
        ))}
      </div>
    </div>
  </section>
);
