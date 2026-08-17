import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CitySearch({ onCitySelect }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.length > 2) {
        fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=5&language=it&format=json`)
          .then(res => res.json())
          .then(data => {
            if (data.results) {
              setResults(data.results);
              setIsOpen(true);
            } else {
              setResults([]);
            }
          })
          .catch(err => console.error("Errore geocoding", err));
      } else {
        setResults([]);
        setIsOpen(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleSelect = (city) => {
    setQuery('');
    setIsOpen(false);
    onCitySelect({
      name: city.name,
      lat: city.latitude,
      lon: city.longitude,
      country: city.country
    });
  };

  return (
    <div ref={wrapperRef} className="relative z-[60] w-full">
      <div className="relative flex items-center">
        <Search className="absolute left-4 text-white/70" size={20} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cerca una città (es. Roma, New York)..."
          className="w-full bg-black/10 backdrop-blur-xl border border-white/20 text-white rounded-2xl py-3 pl-12 pr-4 outline-none placeholder:text-white/60 focus:bg-white/10 transition-all shadow-lg"
        />
      </div>

      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-black/40 backdrop-blur-3xl border border-white/20 rounded-2xl overflow-hidden shadow-2xl"
          >
            {results.map((city) => (
              <div 
                key={city.id}
                onClick={() => handleSelect(city)}
                className="flex items-center px-4 py-3 hover:bg-white/10 cursor-pointer transition-colors border-b border-white/5 last:border-0"
              >
                <MapPin size={18} className="mr-3 text-white/70" />
                <div>
                  <div className="text-white font-medium">{city.name}</div>
                  <div className="text-white/60 text-sm">
                    {city.admin1 ? `${city.admin1}, ` : ''}{city.country}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
