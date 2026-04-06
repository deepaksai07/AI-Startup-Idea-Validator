'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { AnalysisView } from '@/components/AnalysisView';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
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
        if (res.status === 404) {
          setError('Idea not found.');
          return;
        }
        if (!res.ok) throw new Error('Failed to fetch idea');
        const data = await res.json();
        setIdea(data);
      } catch {
        setError('Could not load this idea. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchIdea();
  }, [id]);

  const formatted = idea
    ? new Date(idea.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return (
    <main className="flex-1 p-6 sm:p-12 relative overflow-hidden">
      {/* Ambient orbs */}
      <div className="absolute top-0 left-[25%] w-[500px] h-[400px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-[10%] w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-8 relative z-10">
        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          onClick={() => router.push('/dashboard')}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-200 text-sm font-medium"
        >
          ← Back to Dashboard
        </motion.button>

        {/* Loading */}
        {isLoading && (
          <div className="flex items-center justify-center py-32">
            <LoadingSpinner size="lg" />
          </div>
        )}

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
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Idea header */}
            <GlassCard className="space-y-3">
              <div className="flex items-start justify-between gap-4">
                <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300">
                  {idea.title}
                </h1>
                <span className="shrink-0 text-xs text-slate-500 mt-2">{formatted}</span>
              </div>
              <p className="text-slate-400 leading-relaxed text-base">{idea.description}</p>
            </GlassCard>

            {/* Analysis */}
            {idea.analysis ? (
              <div className="space-y-4">
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl font-bold text-slate-300 flex items-center gap-2"
                >
                  <span>🤖</span> AI Analysis
                </motion.h2>
                <AnalysisView analysis={idea.analysis} />
              </div>
            ) : (
              <GlassCard className="text-center py-12 space-y-3">
                <div className="text-5xl">⏳</div>
                <p className="text-slate-400">Analysis is not available for this idea yet.</p>
                <p className="text-slate-500 text-sm">This can happen if the AI encountered an error. Try submitting again.</p>
              </GlassCard>
            )}
          </motion.div>
        )}
      </div>
    </main>
  );
}
