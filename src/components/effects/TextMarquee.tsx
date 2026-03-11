'use client';

import { motion } from 'framer-motion';

interface TextMarqueeProps {
  text: string;
}

export default function TextMarquee({ text }: TextMarqueeProps) {
  return (
    <div className="relative flex overflow-hidden whitespace-nowrap bg-[#1D7018] text-[#39FF14] py-4 md:py-6 border-y border-[#39FF14]/30 select-none">
      <div className="absolute inset-0 noise mix-blend-overlay opacity-50 pointer-events-none" />
      <motion.div
        className="flex gap-8 px-4"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
      >
        {/* Repeat the text enough times to fill a wide screen and scroll smoothly */}
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-center gap-8">
            <span className="text-xl md:text-3xl font-black uppercase tracking-[0.2em]">
              {text}
            </span>
            <span className="text-xl md:text-3xl font-black opacity-50">•</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
