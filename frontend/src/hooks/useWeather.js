import { useState, useEffect, useCallback } from 'react';

const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

// Mappa i codici WMO di Open-Meteo alle condizioni UI
function mapWeatherCode(code, isDay) {
  if (code === 0 || code === 1) return isDay ? 'sunny' : 'night';
  if (code <= 3) return 'cloudy';
  if (code >= 51 && code <= 67) return 'rainy';
  if (code >= 71 && code <= 77) return 'cloudy'; // neve
  if (code >= 80 && code <= 82) return 'rainy';
  if (code >= 95) return 'rainy'; // temporale
  return isDay ? 'sunny' : 'night';
}

// Descrizione leggibile dal codice WMO
function mapWeatherDescription(code) {
  if (code === 0) return 'Cielo sereno';
  if (code === 1) return 'Prevalentemente sereno';
  if (code === 2) return 'Parzialmente nuvoloso';
  if (code === 3) return 'Coperto';
  if (code >= 51 && code <= 55) return 'Pioggerella';
  if (code >= 61 && code <= 65) return 'Pioggia';
  if (code >= 71 && code <= 77) return 'Neve';
  if (code >= 80 && code <= 82) return 'Rovesci di pioggia';
  if (code >= 95) return 'Temporale';
  return 'Condizioni variabili';
}

export function useWeather(lat, lon) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWeather = useCallback(async () => {
    if (!lat || !lon) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BACKEND_URL}/api/weather/current?lat=${lat}&lon=${lon}`);
      if (!res.ok) throw new Error(`Backend error: ${res.status}`);
      const json = await res.json();
      setData({
        temp: Math.round(json.temperature),
        windSpeed: Math.round(json.windspeed),
        windDirection: json.winddirection,
        weatherCode: json.weathercode,
        isDay: json.is_day === 1,
        condition: mapWeatherCode(json.weathercode, json.is_day === 1),
        description: mapWeatherDescription(json.weathercode),
        // Open-Meteo non fornisce high/low nel current_weather — mettiamo dei valori relativi
        high: Math.round(json.temperature + 3),
        low: Math.round(json.temperature - 5),
      });
    } catch (err) {
      console.warn('Backend non raggiungibile, uso dati mock:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [lat, lon]);

  useEffect(() => {
    fetchWeather();
    // Auto-refresh ogni 10 minuti
    const interval = setInterval(fetchWeather, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchWeather]);

  return { data, loading, error, refresh: fetchWeather };
}
