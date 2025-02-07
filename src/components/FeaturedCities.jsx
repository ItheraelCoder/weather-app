import { useEffect, useState } from 'react';
import { fetchWeatherData } from '../services/weatherService';
import { motion } from 'framer-motion'; // Importa Framer Motion para animaciones

export const FeaturedCities = () => {
  const [cities] = useState([
    { name: 'New York', country: 'USA' },
    { name: 'Tokyo', country: 'Japan' },
    { name: 'London', country: 'UK' },
    { name: 'Paris', country: 'France' },
    { name: 'Sydney', country: 'Australia' },
    { name: 'Berlin', country: 'Germany' },
    { name: 'Moscow', country: 'Russia' },
    { name: 'Beijing', country: 'China' },
    { name: 'Cairo', country: 'Egypt' },
    { name: 'Rio de Janeiro', country: 'Brazil' },
  ]);
  const [weatherData, setWeatherData] = useState([]);
  const [currentSet, setCurrentSet] = useState(0);

  useEffect(() => {
    // Función para obtener el clima de todas las ciudades
    const fetchAllCitiesWeather = async () => {
      const data = await Promise.all(
        cities.map(async (city) => {
          const response = await fetchWeatherData(city.name);
          return response;
        })
      );
      setWeatherData(data);
    };

    fetchAllCitiesWeather();
  }, [cities]);

  useEffect(() => {
    // Cambiar el conjunto de ciudades mostradas cada 20 segundos
    const interval = setInterval(() => {
      setCurrentSet((prevSet) => (prevSet + 1) % Math.ceil(cities.length / 4));
    }, 20000); // 20 segundos

    return () => clearInterval(interval); // Limpiar el intervalo al desmontar el componente
  }, [cities.length]);

  if (weatherData.length === 0) {
    return <div className="text-white text-center p-4">Cargando ciudades destacadas...</div>;
  }

  // Obtener el conjunto actual de 4 ciudades
  const startIndex = currentSet * 4;
  const currentCities = weatherData.slice(startIndex, startIndex + 4);

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }} // Animación inicial
      animate={{ opacity: 1, x: 0 }} // Animación al aparecer
      transition={{ duration: 0.5 }} // Duración de la animación
      className="w-1/4 fixed left-0 top-0 h-screen bg-gradient-to-b from-blue-500 to-blue-600 p-4 overflow-y-auto"
    >
      <h2 className="text-2xl font-bold text-white mb-6">Ciudades destacadas</h2>
      <div className="space-y-4">
        {currentCities.map((cityData, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }} // Animación inicial de cada carta
            animate={{ opacity: 1, y: 0 }} // Animación al aparecer
            transition={{ duration: 0.5, delay: index * 0.1 }} // Retraso para animación escalonada
            className="bg-white bg-opacity-90 p-4 rounded-lg shadow-lg"
          >
            <h3 className="text-xl font-semibold text-gray-800">
              {cityData.location.name}, {cityData.location.country}
            </h3>
            <p className="text-gray-700"><strong>Temperatura:</strong> {cityData.current.temp_c}°C</p>
            <p className="text-gray-700"><strong>Condición:</strong> {cityData.current.condition.text}</p>
            <p className="text-gray-700"><strong>Humedad:</strong> {cityData.current.humidity}%</p>
            <p className="text-gray-700"><strong>Viento:</strong> {cityData.current.wind_kph} km/h</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};