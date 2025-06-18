import React from 'react';

const community = [
  {
    entry: 'Pulled The Star today—feeling hopeful and inspired! 🌟',
    user: 'anon-1',
  },
  {
    entry: 'My birth chart reading was so accurate, wow.',
    user: 'anon-2',
  },
  {
    entry: 'Shared my first 3D spread—love this feature!',
    user: 'anon-3',
  },
];

export const CommunityPreview: React.FC = () => (
  <section className="w-full py-16 bg-gradient-to-b from-[#2C003E] to-[#0F0014]">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-cinzel font-bold mb-8 text-[#9D4EDD]">Community Preview</h2>
      <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
        {community.map((c, i) => (
          <div key={i} className="bg-[#1A1A2E] border border-[#4B1E6B] rounded-xl p-6 shadow-lg flex-1 flex flex-col justify-between">
            <p className="text-lg mb-4 text-[#F5E8FF]">{c.entry}</p>
            <div className="text-xs text-[#9D4EDD]">by {c.user}</div>
          </div>
        ))}
      </div>
      <a href="/community" className="inline-block mt-8 bg-[#9D4EDD] text-[#0F0014] px-6 py-2 rounded font-semibold hover:bg-[#4B1E6B] transition">Join the Conversation</a>
    </div>
  </section>
);
