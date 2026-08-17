import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MainLayout from './layouts/MainLayout';
import CurrentWeather from './components/CurrentWeather';
import WeatherDetails from './components/WeatherDetails';
import MorningBriefingFab from './components/MorningBriefingFab';
import BriefingConfigModal from './components/BriefingConfigModal';
import CitySearch from './components/CitySearch';
import WeatherMap from './components/WeatherMap';
import { useWeather } from './hooks/useWeather';
import { cn } from './utils/cn';
import { RefreshCw, WifiOff } from 'lucide-react';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const [location, setLocation] = useState({
    name: 'Milano',
    lat: 45.4642,
    lon: 9.1900
  });

  // Dati meteo REALI dal backend
  const { data: weather, loading, error, refresh } = useWeather(location.lat, location.lon);

  // Dati da mostrare: reali se disponibili, mock come fallback
  const condition = weather?.condition ?? 'sunny';
  const currentData = {
    city: location.name,
    temp: weather?.temp ?? '--',
    high: weather?.high ?? '--',
    low: weather?.low ?? '--',
    description: weather?.description ?? 'Caricamento...',
    condition,
  };
  const detailsData = {
    humidity: '--',   // non disponibile in current_weather (solo nel daily)
    windSpeed: weather?.windSpeed ?? '--',
    feelsLike: weather?.temp ?? '--',
    visibility: '--',
    sunrise: '--',
    sunset: '--',
  };

  return (
    <MainLayout weatherCondition={condition}>
      
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
          "h-full flex flex-col space-y-6 overflow-y-auto no-scrollbar",
          isMapExpanded ? "lg:w-[35%]" : "lg:w-[65%]",
          "w-full"
        )}
      >
        <CitySearch onCitySelect={setLocation} />

        {/* Stato loading / errore */}
        <AnimatePresence>
          {loading && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex items-center justify-center space-x-2 text-white/60 text-sm py-2"
            >
              <RefreshCw size={14} className="animate-spin" />
              <span>Aggiornamento dati...</span>
            </motion.div>
          )}
          {error && !loading && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex items-center justify-between bg-black/20 backdrop-blur rounded-2xl px-4 py-2 text-sm text-white/70 border border-white/10"
            >
              <div className="flex items-center space-x-2">
                <WifiOff size={14} className="text-orange-300" />
                <span>Backend offline — dati mock attivi</span>
              </div>
              <button onClick={refresh} className="text-white/50 hover:text-white transition-colors">
                <RefreshCw size={14} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <CurrentWeather {...currentData} />
        <WeatherDetails details={detailsData} />

        {/* Mappa su mobile (in coda) */}
        <div className="lg:hidden w-full h-[400px] mt-8">
          <WeatherMap lat={location.lat} lon={location.lon} isExpanded={false} onToggleExpand={() => {}} />
        </div>

        <div className="h-24 w-full flex-shrink-0" />
      </motion.div>

      <MorningBriefingFab onClick={() => setIsModalOpen(true)} />
      <BriefingConfigModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        location={location}
      />
    </MainLayout>
  );
}

export default App;
