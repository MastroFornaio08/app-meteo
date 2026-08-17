import React from 'react';
import { BellRing } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MorningBriefingFab({ onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="fixed bottom-8 right-8 z-50 bg-white/20 backdrop-blur-xl border border-white/40 p-4 rounded-full shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] text-white flex items-center justify-center transition-all hover:bg-white/30"
    >
      <BellRing size={28} className="drop-shadow-lg" />
    </motion.button>
  );
}
