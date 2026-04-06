'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 border-b ${
      scrolled 
        ? "bg-[#050508]/80 backdrop-blur-2xl border-white/[0.05] py-4" 
        : "bg-transparent border-transparent py-6"
    }`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-[0_0_14px_rgba(139,92,246,0.5)] group-hover:shadow-[0_0_22px_rgba(139,92,246,0.7)] transition-shadow duration-300">
            <span className="text-sm">💡</span>
          </div>
          <span className="font-bold text-white text-lg tracking-tight">
            IdeaValidator<span className="text-violet-400">.ai</span>
          </span>
        </Link>

        <nav className="flex items-center gap-5">
          <Link href="/dashboard" className="text-white/40 hover:text-white/80 transition-colors duration-200 text-sm font-medium">
            Dashboard
          </Link>
          <Link
            href="/validate"
            className="rounded-xl font-semibold text-white px-4 py-2 text-sm
              bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500
              shadow-[0_0_14px_rgba(139,92,246,0.35)] hover:shadow-[0_0_26px_rgba(139,92,246,0.6)]
              transition-all duration-300"
          >
            + New Idea
          </Link>
        </nav>
      </div>
    </header>
  );
}
