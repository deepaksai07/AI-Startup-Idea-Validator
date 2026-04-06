'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface IdeaCardProps {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  index: number;
}

export function IdeaCard({ id, title, description, createdAt, index }: IdeaCardProps) {
  const router = useRouter();

  const formatted = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -4, scale: 1.01 }}
      onClick={() => router.push(`/ideas/${id}`)}
      className="cursor-pointer group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl
        border border-white/10 p-6
        hover:bg-white/[0.08] hover:border-purple-500/30
        transition-colors duration-300
        shadow-[0_8px_24px_-8px_rgba(0,0,0,0.4)]
        hover:shadow-[0_8px_32px_-4px_rgba(147,51,234,0.15)]"
    >
      {/* Top glow line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-white text-lg leading-tight group-hover:text-purple-300 transition-colors duration-300 line-clamp-2">
            {title}
          </h3>
          <span className="shrink-0 text-purple-400 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 group-hover:translate-x-0 text-xl">
            →
          </span>
        </div>

        <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
          {description}
        </p>

        <div className="pt-2 border-t border-white/5">
          <span className="text-xs text-slate-500">{formatted}</span>
        </div>
      </div>
    </motion.div>
  );
}
