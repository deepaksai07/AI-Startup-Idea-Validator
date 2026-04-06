'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export function IdeaForm() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title.trim() || !description.trim()) {
      setError('Both title and description are required.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/ideas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to submit idea');
      }

      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <GlassCard className="max-w-2xl w-full" noAnimation>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Hero heading */}
        <div className="mb-9 text-center space-y-3">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full bg-violet-500/10 border border-violet-500/20 px-4 py-1.5 mb-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            <span className="text-violet-300 text-xs font-medium tracking-wide">AI-Powered Analysis</span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-slate-400">
            Validate Your Idea
          </h1>
          <p className="text-slate-400 text-base md:text-lg max-w-md mx-auto leading-relaxed">
            Describe your startup. Our AI gives you instant analysis on market fit, risks, and profitability.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title input */}
          <div className="space-y-2">
            <label htmlFor="idea-title" className="text-sm font-medium text-slate-300 flex items-center gap-1.5">
              <span className="text-purple-400">01</span> Startup Title
            </label>
            <input
              id="idea-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. AI Resume Builder"
              disabled={isLoading}
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40 hover:border-white/15 transition-all duration-200 disabled:opacity-40"
            />
          </div>

          {/* Description textarea */}
          <div className="space-y-2">
            <label htmlFor="idea-description" className="text-sm font-medium text-slate-300 flex items-center gap-1.5">
              <span className="text-purple-400">02</span> Description
            </label>
            <textarea
              id="idea-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the problem you solve, who your target users are, and how your product works..."
              disabled={isLoading}
              rows={5}
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40 hover:border-white/15 transition-all duration-200 resize-none disabled:opacity-40"
            />
          </div>

          {/* Error message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 flex items-center gap-2">
                  <span className="text-red-400">⚠</span> {error}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit button */}
          <motion.button
            id="submit-idea-btn"
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
            className="w-full flex items-center justify-center gap-3 rounded-xl font-semibold text-white px-8 py-4 text-base
              bg-gradient-to-r from-violet-600 to-indigo-600
              hover:from-violet-500 hover:to-indigo-500
              shadow-[0_0_24px_rgba(139,92,246,0.35)]
              hover:shadow-[0_0_40px_rgba(139,92,246,0.55)]
              active:shadow-[0_0_16px_rgba(139,92,246,0.3)]
              transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <LoadingSpinner size="sm" />
                <span>Analyzing with AI — this may take a moment...</span>
              </>
            ) : (
              <>
                <span>Validate My Idea</span>
                <span className="text-violet-300">→</span>
              </>
            )}
          </motion.button>

          {!isLoading && (
            <p className="text-center text-xs text-slate-600">
              Powered by Gemini AI · Results appear instantly
            </p>
          )}
        </form>
      </motion.div>
    </GlassCard>
  );
}
