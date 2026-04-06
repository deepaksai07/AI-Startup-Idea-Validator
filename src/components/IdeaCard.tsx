'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface IdeaCardProps {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  index: number;
  onDelete?: (id: string) => void;
}

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.07,
      duration: 0.45,
      ease: 'easeOut' as const,
    },
  }),
};

export function IdeaCard({ id, title, description, createdAt, index, onDelete }: IdeaCardProps) {
  const router = useRouter();

  const formatted = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this idea? This action cannot be undone.')) {
      return;
    }

    try {
      const res = await fetch(`/api/ideas/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        onDelete?.(id);
      } else {
        alert('Failed to delete the idea. Please try again.');
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -6, scale: 1.012 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      onClick={() => router.push(`/ideas/${id}`)}
      className="cursor-pointer group relative overflow-hidden rounded-2xl
        bg-white/[0.04] backdrop-blur-2xl
        border border-white/[0.08]
        p-6
        hover:bg-white/[0.07] hover:border-violet-500/25
        transition-colors duration-300"
      style={{
        boxShadow: "0 4px 24px -6px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 12px 40px -8px rgba(0,0,0,0.5), 0 0 0 1px rgba(139,92,246,0.15), 0 0 40px -10px rgba(139,92,246,0.2), inset 0 1px 0 rgba(255,255,255,0.08)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 4px 24px -6px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)";
      }}
    >
      {/* Delete button */}
      <button
        onClick={handleDelete}
        className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-white/0 hover:bg-red-500/10 text-white/0 group-hover:text-white/40 hover:text-red-400 transition-all duration-200"
        title="Delete Idea"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        </svg>
      </button>

      {/* Top accent line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Hover bg glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />

      <div className="relative space-y-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold text-white text-base leading-snug group-hover:text-violet-200 transition-colors duration-300 line-clamp-2">
            {title}
          </h3>
          <motion.span
            initial={{ opacity: 0, x: -4 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="shrink-0 text-violet-400 group-hover:opacity-100 opacity-0 transition-all duration-300 text-lg mt-0.5"
          >
            →
          </motion.span>
        </div>

        <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
          {description}
        </p>

        <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
          <span className="text-xs text-slate-500">{formatted}</span>
          <span className="text-xs text-violet-400/60 group-hover:text-violet-400 transition-colors duration-300 font-medium">
            View Analysis →
          </span>
        </div>
      </div>
    </motion.div>
  );
}
