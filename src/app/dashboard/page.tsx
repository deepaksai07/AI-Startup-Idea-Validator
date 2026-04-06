'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { IdeaCard } from '@/components/IdeaCard';
import { SkeletonCard } from '@/components/ui/Skeleton';

interface Idea {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const res = await fetch('/api/ideas');
        if (!res.ok) throw new Error('Failed to load ideas');
        const data = await res.json();
        setIdeas(data);
      } catch {
        setError('Could not load your ideas. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchIdeas();
  }, []);

  const handleDeleteIdea = (id: string) => {
    setIdeas(prev => prev.filter(idea => idea.id !== id));
  };

  return (
    <main className="flex-1 p-6 sm:p-10 lg:p-14">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 tracking-tight">
              Your Ideas
            </h1>
            <p className="text-slate-500 mt-1.5 text-sm">
              {isLoading
                ? 'Loading your ideas...'
                : ideas.length === 0
                ? 'No ideas yet — create your first one!'
                : `${ideas.length} idea${ideas.length !== 1 ? 's' : ''} validated with AI`}
            </p>
          </div>

          <motion.button
            id="new-idea-btn"
            onClick={() => router.push('/')}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 rounded-xl font-semibold text-white px-5 py-2.5 text-sm
              bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500
              shadow-[0_0_16px_rgba(139,92,246,0.3)] hover:shadow-[0_0_28px_rgba(139,92,246,0.5)]
              transition-all duration-300"
          >
            + Validate New Idea
          </motion.button>
        </motion.div>

        {/* Error */}
        {!isLoading && error && (
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 text-center text-red-400">
            {error}
          </div>
        )}

        {/* Skeleton loading grid */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !error && ideas.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center py-36 gap-5 text-center"
          >
            <div className="w-20 h-20 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-4xl shadow-[0_0_40px_rgba(139,92,246,0.15)]">
              💡
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-white">No ideas yet</h2>
              <p className="text-slate-500 text-sm max-w-xs">Submit your first startup idea to get an instant AI-powered analysis.</p>
            </div>
            <motion.button
              onClick={() => router.push('/')}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="mt-2 rounded-xl font-semibold text-white px-6 py-3
                bg-gradient-to-r from-violet-600 to-indigo-600
                shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_32px_rgba(139,92,246,0.5)]
                transition-all duration-300"
            >
              Validate Your First Idea →
            </motion.button>
          </motion.div>
        )}

        {/* Ideas grid */}
        {!isLoading && !error && ideas.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {ideas.map((idea, i) => (
              <IdeaCard
                key={idea.id}
                id={idea.id}
                title={idea.title}
                description={idea.description}
                createdAt={idea.createdAt}
                index={i}
                onDelete={handleDeleteIdea}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
