import { Droplets, Thermometer, Eye, Sunrise, Sunset, Wind, ThermometerSun } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WeatherDetails({ details }) {
  const items = [
    { label: 'Umidità', value: `${details.humidity}%`, icon: Droplets },
    { label: 'Vento', value: `${details.windSpeed} km/h`, icon: Wind },
    { label: 'Percepita', value: `${details.feelsLike}°`, icon: ThermometerSun },
    { label: 'Visibilità', value: `${details.visibility} km`, icon: Eye },
    { label: 'Alba', value: details.sunrise, icon: Sunrise },
    { label: 'Tramonto', value: details.sunset, icon: Sunset },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      className="grid grid-cols-2 gap-4"
    >
      {items.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div key={idx} className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-4 flex flex-col items-start justify-between h-32 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]">
            <div className="flex items-center space-x-2 opacity-70 mb-2">
              <Icon size={18} />
              <span className="text-xs font-semibold uppercase tracking-wider">{item.label}</span>
            </div>
            <span className="text-3xl font-light">{item.value}</span>
          </div>
        );
      })}
    </motion.div>
  );
}
