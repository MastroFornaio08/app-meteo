import React from 'react';
import { cn } from '../utils/cn';
import RainEffect from '../components/RainEffect';

// Un mapping di sfondi sfumati premium in base alla condizione meteo
const backgrounds = {
  sunny: 'from-blue-400 to-blue-700',
  rainy: 'from-slate-800 to-slate-950',
  cloudy: 'from-slate-400 to-slate-600',
  night: 'from-indigo-900 to-slate-900',
};

export default function MainLayout({ children, weatherCondition = 'sunny' }) {
  const currentBg = backgrounds[weatherCondition] || backgrounds.sunny;

  return (
    <div className={cn(
      "relative min-h-screen w-full overflow-hidden text-white font-sans transition-colors duration-1000 bg-gradient-to-br",
      currentBg
    )}>
      {/* Animazione pioggia — mostrata solo se il meteo è rainy */}
      {weatherCondition === 'rainy' && <RainEffect />}

      {/* Elementi decorativi (Cerchi sfocati per dare profondità) */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-white opacity-10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-200 opacity-10 rounded-full blur-3xl pointer-events-none" />
      
      {/* Contenitore principale - Full width per sfruttare gli schermi larghi e avvicinarlo ai bordi */}
      <main className="relative z-20 w-full h-screen flex flex-col lg:flex-row p-4 lg:p-6 gap-6">
        {children}
      </main>
    </div>
  );
}
