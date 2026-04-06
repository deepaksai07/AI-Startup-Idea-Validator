'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { AnalysisView } from '@/components/AnalysisView';
import { SkeletonDetail } from '@/components/ui/Skeleton';
import { GlassCard } from '@/components/ui/GlassCard';

interface Analysis {
  problem: string;
  customer: string;
  market: string;
  competitor: Array<{ name: string; difference: string }>;
  tech_stack: string[];
  risk_level: string;
  profitability_score: number;
  justification: string;
}

interface Idea {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  analysis: Analysis | null;
}

export default function IdeaDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [idea, setIdea] = useState<Idea | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    const fetchIdea = async () => {
      try {
        const res = await fetch(`/api/ideas/${id}`);
        if (res.status === 404) { setError('Idea not found.'); return; }
        if (!res.ok) throw new Error('Failed to fetch idea');
        setIdea(await res.json());
      } catch {
        setError('Could not load this idea. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchIdea();
  }, [id]);

  const formatted = idea
    ? new Date(idea.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : '';

  return (
    <main className="flex-1 p-6 sm:p-10 lg:p-14">
      <div className="max-w-5xl mx-auto space-y-7">

        {/* Back */}
        <motion.button
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          onClick={() => router.push('/dashboard')}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-200 transition-colors duration-200 text-sm font-medium group"
        >
          <span className="group-hover:-translate-x-1 transition-transform duration-200">←</span>
          Back to Dashboard
        </motion.button>

        {/* Skeleton */}
        <AnimatePresence>
          {isLoading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <SkeletonDetail />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error */}
        {!isLoading && error && (
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 text-center text-red-400">
            {error}
          </div>
        )}

        {/* Content */}
        {!isLoading && !error && idea && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="space-y-7"
          >
            {/* Idea header */}
            <GlassCard noAnimation className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-slate-300">
                  {idea.title}
                </h1>
                <span className="shrink-0 inline-flex items-center gap-1.5 text-xs text-slate-600 bg-white/5 border border-white/8 rounded-lg px-3 py-1.5 whitespace-nowrap mt-1">
                  📅 {formatted}
                </span>
              </div>
              <p className="text-slate-400 leading-relaxed text-sm md:text-base max-w-3xl">{idea.description}</p>
            </GlassCard>

            {/* Analysis */}
            {idea.analysis ? (
              <div className="space-y-5">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-3"
                >
                  <h2 className="text-lg font-bold text-slate-200">AI Analysis Report</h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
                  <span className="text-xs text-slate-600 bg-white/5 border border-white/8 rounded-lg px-2.5 py-1">
                    🤖 AI Generated
                  </span>
                </motion.div>
                <AnalysisView analysis={idea.analysis} />
              </div>
            ) : (
              <GlassCard noAnimation className="text-center py-16 space-y-4">
                <div className="text-5xl">⏳</div>
                <div className="space-y-2">
                  <p className="text-slate-300 font-semibold">Analysis not available</p>
                  <p className="text-slate-500 text-sm">The AI may have encountered an issue processing this idea.</p>
                </div>
              </GlassCard>
            )}
          </motion.div>
        )}
      </div>
    </main>
  );
}
