"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import React from "react";

interface GlassCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: React.ReactNode;
  className?: string;
  noAnimation?: boolean;
}

export function GlassCard({ children, className = "", noAnimation = false, ...rest }: GlassCardProps) {
  const motionProps = noAnimation
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.55, ease: 'easeOut' as const },
      };

  return (
    <motion.div
      {...motionProps}
      {...rest}
      className={`
        relative overflow-hidden rounded-2xl
        bg-white/[0.04] backdrop-blur-2xl
        border border-white/[0.08]
        p-7 md:p-10
        transition-colors duration-500
        hover:bg-white/[0.06] hover:border-white/[0.12]
        ${className}
      `}
      style={{
        boxShadow: `
          0 4px 6px -1px rgba(0,0,0,0.3),
          0 20px 60px -10px rgba(0,0,0,0.5),
          inset 0 1px 0 0 rgba(255,255,255,0.08),
          inset 0 -1px 0 0 rgba(0,0,0,0.2)
        `,
        ...(rest.style || {}),
      }}
    >
      {/* Top glow line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-400/50 to-transparent" />
      {/* Corner shine */}
      <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent rounded-br-full pointer-events-none" />
      {children}
    </motion.div>
  );
}
