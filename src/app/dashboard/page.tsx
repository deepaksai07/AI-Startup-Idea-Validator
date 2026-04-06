'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { IdeaCard } from '@/components/IdeaCard';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

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

  return (
    <main className="flex-1 p-6 sm:p-12 relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-0 left-[30%] w-[600px] h-[400px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-[20%] w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-10 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
              Your Ideas
            </h1>
            <p className="text-slate-400 mt-1">
              {isLoading ? 'Loading...' : `${ideas.length} idea${ideas.length !== 1 ? 's' : ''} validated`}
            </p>
          </div>

          <motion.button
            id="new-idea-btn"
            onClick={() => router.push('/')}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 rounded-xl font-semibold text-white px-6 py-3
              bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500
              shadow-[0_0_16px_rgba(147,51,234,0.3)] hover:shadow-[0_0_24px_rgba(147,51,234,0.5)]
              transition-all duration-300"
          >
            + New Idea
          </motion.button>
        </motion.div>

        {/* States */}
        {isLoading && (
          <div className="flex items-center justify-center py-32">
            <LoadingSpinner size="lg" />
          </div>
        )}

        {!isLoading && error && (
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 text-center text-red-400">
            {error}
          </div>
        )}

        {!isLoading && !error && ideas.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-32 gap-4"
          >
            <div className="text-6xl">💡</div>
            <p className="text-slate-400 text-xl">No ideas yet. Create your first one!</p>
            <motion.button
              onClick={() => router.push('/')}
              whileHover={{ scale: 1.04 }}
              className="mt-2 rounded-xl font-semibold text-white px-6 py-3
                bg-gradient-to-r from-purple-600 to-indigo-600
                shadow-[0_0_16px_rgba(147,51,234,0.3)] transition-all duration-300"
            >
              Validate an Idea
            </motion.button>
          </motion.div>
        )}

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
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
