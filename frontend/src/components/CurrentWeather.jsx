import React from 'react';
import { motion } from 'framer-motion';
import { CloudRain, Sun, Cloud, Moon } from 'lucide-react';

export default function CurrentWeather({ condition, temp, city, high, low, description }) {
  
  // Scelta dell'icona (mock)
  const Icon = condition === 'sunny' ? Sun : 
               condition === 'rainy' ? CloudRain : 
               condition === 'cloudy' ? Cloud : Moon;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col items-center justify-center mt-8 mb-4 space-y-2 text-center"
    >
      <h1 className="text-4xl font-light tracking-wider drop-shadow-sm">{city}</h1>
      <p className="text-lg font-medium opacity-80 capitalize">{description}</p>
      
      <div className="flex items-center justify-center py-6">
        <Icon size={120} className="opacity-90 drop-shadow-xl" strokeWidth={1.5} />
      </div>

      <div className="text-8xl font-thin tracking-tighter ml-6 drop-shadow-md">
        {temp}&deg;
      </div>
      
      <div className="flex space-x-4 text-lg opacity-80 pt-4">
        <span>H:{high}&deg;</span>
        <span>L:{low}&deg;</span>
      </div>
    </motion.div>
  );
}
