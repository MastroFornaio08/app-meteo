import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MainLayout from './layouts/MainLayout';
import CurrentWeather from './components/CurrentWeather';
import WeatherDetails from './components/WeatherDetails';
import MorningBriefingFab from './components/MorningBriefingFab';
import BriefingConfigModal from './components/BriefingConfigModal';
import CitySearch from './components/CitySearch';
import WeatherMap from './components/WeatherMap';
import { cn } from './utils/cn';

function App() {
  const [weatherCondition, setWeatherCondition] = useState('sunny');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  
  const [location, setLocation] = useState({
    name: 'Milano',
    lat: 45.4642,
    lon: 9.1900
  });

  const currentData = {
    city: location.name,
    temp: 24,
    high: 28,
    low: 18,
    description: 'Prevalentemente soleggiato',
    condition: weatherCondition
  };

  const detailsData = {
    humidity: 45,
    windSpeed: 12,
    feelsLike: 25,
    visibility: 10,
    sunrise: '06:12',
    sunset: '20:45'
  };

  return (
    <MainLayout weatherCondition={weatherCondition}>
      
      {/* MAPPA A SINISTRA */}
      <motion.div 
        layout
        className={cn(
          "hidden lg:flex h-full flex-col transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isMapExpanded ? "w-[65%]" : "w-[35%]"
        )}
      >
        <WeatherMap 
          lat={location.lat} 
          lon={location.lon} 
          isExpanded={isMapExpanded} 
          onToggleExpand={() => setIsMapExpanded(!isMapExpanded)}
        />
      </motion.div>

      {/* CONTENUTO A DESTRA */}
      <motion.div 
        layout
        className={cn(
          "h-full flex flex-col space-y-6 overflow-y-auto no-scrollbar transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isMapExpanded ? "lg:w-[35%]" : "lg:w-[65%]",
          "w-full"
        )}
      >
        <CitySearch onCitySelect={setLocation} />

        <div className="flex justify-center space-x-2 mt-2 mb-2 z-20">
          {['sunny', 'cloudy', 'rainy', 'night'].map(c => (
            <button 
              key={c} 
              onClick={() => setWeatherCondition(c)}
              className={`text-xs backdrop-blur-md rounded-full px-3 py-1 uppercase border border-white/20 transition-all ${weatherCondition === c ? 'bg-white/30 font-bold' : 'bg-black/20'}`}
            >
              {c}
            </button>
          ))}
        </div>

        <CurrentWeather {...currentData} />
        <WeatherDetails details={detailsData} />
        
        {/* Mappa visibile in coda solo su schermi piccoli (mobile) dove il layout laterale non c'è */}
        <div className="lg:hidden w-full h-[400px] mt-8">
          <WeatherMap 
            lat={location.lat} 
            lon={location.lon} 
            isExpanded={false} 
            onToggleExpand={() => {}}
          />
        </div>

        {/* Spazio fondo */}
        <div className="h-24 w-full flex-shrink-0" />
      </motion.div>

      <MorningBriefingFab onClick={() => setIsModalOpen(true)} />
      <BriefingConfigModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </MainLayout>
  );
}

export default App;
