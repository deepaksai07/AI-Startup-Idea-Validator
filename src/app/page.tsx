'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';

// Dynamically import Orb to avoid SSR canvas issues
const Orb = dynamic(() => import('@/components/Orb'), { ssr: false });

const features = [
  {
    icon: '🎯',
    title: 'Problem & Market Fit',
    desc: 'Instantly understand the core problem you solve and how big the market opportunity is.',
  },
  {
    icon: '🏆',
    title: 'Competitor Analysis',
    desc: 'Get a breakdown of 3 key competitors and exactly how your product differentiates.',
  },
  {
    icon: '⚡',
    title: 'Risk & Profitability',
    desc: 'Receive a risk level assessment and a 0–100 profitability score with full justification.',
  },
  {
    icon: '🛠️',
    title: 'Tech Stack Advice',
    desc: 'Get 4–6 recommended technologies tailored to your specific startup concept.',
  },
];

export default function LandingPage() {
  return (
    <main className="flex-1 flex flex-col">

      {/* ── HERO ── */}
      <section className="relative flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-6 overflow-hidden">

        {/* OGL Orb — full-page background */}
        <div className="absolute inset-0 z-0">
          <Orb
            hue={240}
            hoverIntensity={2}
            rotateOnHover
            forceHoverState={false}
            backgroundColor="#050508"
          />
        </div>

        {/* Very subtle dark overlay so text is legible */}
        <div className="absolute inset-0 z-[1] bg-[#050508]/40" />

        {/* Content */}
        <div className="relative z-[2] flex flex-col items-center text-center gap-6 max-w-4xl mx-auto">

          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] border border-violet-500/25 px-4 py-1.5 pill-glow">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            <span className="text-violet-300 text-xs font-medium tracking-wide">AI-Powered Startup Analysis</span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.05]">
            <span className="text-white">Validate Your</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-300 to-indigo-400">
              Startup Idea.
            </span>
          </h1>

          <p className="text-white/45 text-lg md:text-xl max-w-2xl leading-relaxed">
            Stop guessing. Let AI analyze your idea across market fit, competitors, risks, and profitability — in seconds.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
            <Link
              href="/validate"
              className="inline-flex items-center gap-2.5 rounded-2xl font-bold text-white px-8 py-4 text-base
                bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500
                shadow-[0_0_28px_rgba(139,92,246,0.45)] hover:shadow-[0_0_44px_rgba(139,92,246,0.65)]
                transition-all duration-300 group"
            >
              <span>Start Validating Free</span>
              <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-2xl font-semibold text-white/60 hover:text-white/90 px-6 py-4 text-base
                border border-white/[0.08] hover:border-white/[0.18] hover:bg-white/[0.04]
                transition-all duration-300"
            >
              View Dashboard
            </Link>
          </div>

          {/* Social proof */}
          <p className="text-white/20 text-xs mt-2">
            No signup required · Powered by Gemini &amp; Groq AI
          </p>
        </div>

        {/* Bottom fade to section below */}
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#050508] to-transparent z-[3]" />
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-5xl mx-auto space-y-16">

          <div className="text-center space-y-3">
            <p className="text-violet-400 text-sm font-semibold tracking-widest uppercase">How it works</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Three steps to clarity</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Describe your idea', desc: 'Enter a title and description for your startup concept.' },
              { step: '02', title: 'AI analyzes it', desc: 'Our AI evaluates market fit, risks, competitors, and more.' },
              { step: '03', title: 'Get your report', desc: 'Receive a structured analysis with profitability score instantly.' },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-7 space-y-4 hover:border-violet-500/20 hover:bg-white/[0.05] transition-all duration-300"
                style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)' }}
              >
                <span className="text-4xl font-black text-violet-500/30">{item.step}</span>
                <h3 className="text-white font-bold text-lg">{item.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-24 px-6 relative z-10 border-t border-white/[0.04]">
        <div className="max-w-5xl mx-auto space-y-16">

          <div className="text-center space-y-3">
            <p className="text-violet-400 text-sm font-semibold tracking-widest uppercase">What you get</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">A complete AI analysis report</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {features.map((f) => (
              <div
                key={f.title}
                className="group rounded-2xl border border-white/[0.07] bg-white/[0.03] p-7 space-y-3 hover:border-violet-500/20 hover:bg-white/[0.05] transition-all duration-300"
                style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)' }}
              >
                <div className="text-3xl">{f.icon}</div>
                <h3 className="text-white font-bold text-base group-hover:text-violet-200 transition-colors duration-300">{f.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-28 px-6 relative z-10 border-t border-white/[0.04] overflow-hidden">
        {/* Soft glow behind CTA */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[300px] bg-violet-600/8 blur-[100px] rounded-full" />
        </div>

        <div className="max-w-2xl mx-auto text-center space-y-7 relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">validate</span> your idea?
          </h2>
          <p className="text-white/40 text-base leading-relaxed">
            It only takes 30 seconds. Describe your startup and let the AI do the heavy lifting.
          </p>
          <Link
            href="/validate"
            className="inline-flex items-center gap-2.5 rounded-2xl font-bold text-white px-10 py-4 text-lg
              bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500
              shadow-[0_0_32px_rgba(139,92,246,0.4)] hover:shadow-[0_0_50px_rgba(139,92,246,0.65)]
              transition-all duration-300 group"
          >
            <span>Validate My Idea</span>
            <span className="group-hover:translate-x-1.5 transition-transform duration-200">→</span>
          </Link>
        </div>
      </section>

    </main>
  );
}
