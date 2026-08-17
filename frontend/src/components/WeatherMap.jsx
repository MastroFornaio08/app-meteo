import { Maximize2, Minimize2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

export default function WeatherMap({ lat, lon, isExpanded, onToggleExpand }) {
  const mapUrl = `https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=mm&metricTemp=°C&metricWind=km/h&zoom=${isExpanded ? 7 : 5}&overlay=wind&product=ecmwf&level=surface&lat=${lat}&lon=${lon}&detailLat=${lat}&detailLon=${lon}&marker=true`;

  return (
    <motion.div 
      key={`${lat}-${lon}`}
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className="w-full h-full rounded-[2rem] overflow-hidden shadow-2xl bg-black/10 flex flex-col relative"
    >
      <div className={cn("w-full h-full absolute inset-0 transition-all duration-500")}>
        <iframe 
          title="Windy Map"
          width="100%" 
          height="100%" 
          src={mapUrl} 
          frameBorder="0"
          className="absolute inset-0 opacity-80 mix-blend-luminosity hover:opacity-100 hover:mix-blend-normal transition-all duration-500" 
        />
      </div>

      {/* Floating Action Button per Espandere/Ridurre */}
      <button 
        onClick={onToggleExpand}
        className="absolute top-5 left-5 z-20 bg-black/40 hover:bg-black/60 backdrop-blur-xl text-white p-2.5 rounded-full transition-colors shadow-lg hidden lg:block"
      >
        {isExpanded ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
      </button>

      {/* Etichetta fluttuante in basso */}
      <div className="absolute bottom-5 left-5 z-20 pointer-events-none">
        <div className="bg-black/40 backdrop-blur-xl text-white/90 px-4 py-2 rounded-full text-xs uppercase tracking-widest font-medium flex items-center space-x-3 shadow-lg">
          <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
          <span>Radar Venti Live</span>
        </div>
      </div>
    </motion.div>
  );
}
