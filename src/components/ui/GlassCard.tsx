"use client";

import { motion } from "framer-motion";
import React from "react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassCard({ children, className = "" }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 hover:bg-white/[0.07] transition-colors duration-500 ${className}`}
      style={{
        boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.4), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)",
      }}
    >
      {/* Subtle top glow line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-400/40 to-transparent" />
      {/* Ambient center glow */}
      <div className="absolute -z-10 inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-700" />
      {children}
    </motion.div>
  );
}
