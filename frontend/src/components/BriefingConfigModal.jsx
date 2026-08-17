import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BriefingConfigModal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 sm:p-0">
          
          {/* Sfondo scuro */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* Contenuto Modale (Glassmorphism) */}
          <motion.div 
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="relative w-full max-w-sm bg-white/10 backdrop-blur-2xl border border-white/20 p-6 rounded-[2rem] shadow-2xl text-white overflow-hidden"
          >
            {/* Effetto luce interno */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
            
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-black/20 rounded-full hover:bg-black/40 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center text-center mt-4 z-10 relative">
              <div className="w-16 h-16 bg-blue-500/30 rounded-full flex items-center justify-center mb-4 border border-blue-400/30">
                <Bell size={32} className="text-white drop-shadow-md" />
              </div>
              <h2 className="text-2xl font-light tracking-wide mb-2">Morning Briefing</h2>
              <p className="text-sm opacity-80 mb-8 font-light">
                Ricevi un riassunto meteo sul tuo smartphone ogni mattina prima di uscire.
              </p>

              <div className="w-full bg-black/20 rounded-2xl p-4 mb-8 border border-white/5">
                <label className="block text-xs uppercase tracking-widest opacity-60 mb-2">Orario Sveglia</label>
                <input 
                  type="time" 
                  defaultValue="07:30"
                  className="bg-transparent text-4xl font-light w-full text-center outline-none [color-scheme:dark]"
                />
              </div>

              <button 
                onClick={onClose}
                className="w-full bg-white text-black py-4 rounded-xl font-medium text-lg hover:bg-gray-100 transition-colors shadow-lg"
              >
                Attiva Notifiche Push
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
