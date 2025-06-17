import React, { useState } from "react";

export function MiniHoroscopeTeaser() {
  const [birth, setBirth] = useState("");
  const [sign, setSign] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  function getZodiac(date: string) {
    const zodiacSigns = [
      { name: "Aries", start: { month: 3, day: 21 }, end: { month: 4, day: 19 } },
      { name: "Taurus", start: { month: 4, day: 20 }, end: { month: 5, day: 20 } },
      { name: "Gemini", start: { month: 5, day: 21 }, end: { month: 6, day: 20 } },
      { name: "Cancer", start: { month: 6, day: 21 }, end: { month: 7, day: 22 } },
      { name: "Leo", start: { month: 7, day: 23 }, end: { month: 8, day: 22 } },
      { name: "Virgo", start: { month: 8, day: 23 }, end: { month: 9, day: 22 } },
      { name: "Libra", start: { month: 9, day: 23 }, end: { month: 10, day: 22 } },
      { name: "Scorpio", start: { month: 10, day: 23 }, end: { month: 11, day: 21 } },
      { name: "Sagittarius", start: { month: 11, day: 22 }, end: { month: 12, day: 21 } },
      { name: "Capricorn", start: { month: 12, day: 22 }, end: { month: 1, day: 19 } },
      { name: "Aquarius", start: { month: 1, day: 20 }, end: { month: 2, day: 18 } },
      { name: "Pisces", start: { month: 2, day: 19 }, end: { month: 3, day: 20 } },
    ];

    const d = new Date(date);
    const month = d.getUTCMonth() + 1;
    const day = d.getUTCDate();

    for (const sign of zodiacSigns) {
      const { name, start, end } = sign;
      if (
        (month === start.month && day >= start.day) ||
        (month === end.month && day <= end.day) ||
        (start.month > end.month && (month > start.month || month < end.month))
      ) {
        return name;
      }
    }
    return null;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSign(getZodiac(birth));
    setShowResult(false);
    setTimeout(() => setShowResult(true), 200); // trigger animation
  }

  return (
    <section className="w-full flex flex-col items-center py-16 px-4 bg-[var(--secondary)] bg-opacity-70 rounded-3xl shadow-lg my-8 relative overflow-hidden">
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-[var(--accent)] opacity-20 rounded-full blur-2xl animate-pulse" />
      <h3 className="text-2xl font-heading text-[var(--accent)] mb-4 animate-fade-in">Mini Horoscope Teaser</h3>
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-center animate-fade-in">
        <input
          type="date"
          value={birth}
          onChange={e => setBirth(e.target.value)}
          className="rounded px-3 py-2 border border-[var(--accent)] bg-[var(--primary)] text-[var(--text)] font-body focus:scale-105 transition-transform duration-200"
          required
        />
        <button type="submit" className="bg-[var(--accent)] text-[var(--primary)] font-bold rounded px-4 py-2 shadow hover:scale-110 transition-transform duration-200">
          Reveal My Sign
        </button>
      </form>
      {sign && (
        <div
          className={`mt-6 text-lg font-body text-[var(--text)] bg-[var(--primary)] bg-opacity-80 rounded p-4 shadow transition-all duration-500 ${showResult ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}`}
        >
          <span className="font-heading text-[var(--accent)] animate-glow">{sign}:</span> Today, the cosmos whispers new beginnings. Embrace the unknown!
        </div>
      )}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.7s cubic-bezier(.4,0,.2,1) both;
        }
        @keyframes glow {
          0% { text-shadow: 0 0 8px var(--accent), 0 0 16px var(--accent); }
          100% { text-shadow: 0 0 16px var(--accent), 0 0 32px var(--accent); }
        }
        .animate-glow {
          animation: glow 1.2s alternate infinite;
        }
      `}</style>
    </section>
  );
}
