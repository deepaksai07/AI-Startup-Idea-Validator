"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import React from "react";

interface AnimatedButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
}

export function AnimatedButton({ children, className = "", ...props }: AnimatedButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
      className={`relative overflow-hidden rounded-full font-semibold text-white px-8 py-4 
        bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500
        transition-colors duration-300
        shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_30px_rgba(147,51,234,0.5)]
        ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
