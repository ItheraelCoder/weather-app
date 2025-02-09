import { useEffect, useState } from 'react';
import { fetchWeatherData } from '../services/weatherService';
import { motion, AnimatePresence } from 'framer-motion'; // Importar AnimatePresence para animaciones de entrada/salida
import { FaCity, FaTimes } from 'react-icons/fa'; // Importar íconos para el botón y el cierre
import { getWeatherIcon } from '../helpers'; // Mantener el helper de íconos

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
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar la apertura/cierre del modal
  const [showTooltip, setShowTooltip] = useState(true); // Estado para controlar el texto flotante

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

  // Ocultar el texto flotante después de 5 segundos o al abrir el modal
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 5000); // 5 segundos

    return () => clearTimeout(timer);
  }, []);

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
    setShowTooltip(false); // Ocultar el texto flotante al abrir el modal
  };

  if (weatherData.length === 0) {
    return <div className="text-white text-center p-4">Cargando ciudades destacadas...</div>;
  }

  // Obtener el conjunto actual de 4 ciudades
  const startIndex = currentSet * 4;
  const currentCities = weatherData.slice(startIndex, startIndex + 4);

  return (
    <>
      {/* Botón para abrir el modal (solo visible cuando el modal está cerrado) */}
      {!isModalOpen && (
        <div className="fixed left-4 top-20 z-50">
          <button
            onClick={handleModalToggle}
            className="bg-blue-600 p-3 rounded-full text-white hover:bg-blue-700 transition duration-300 relative"
            aria-label="Abrir ciudades destacadas"
          >
            <FaCity className="text-xl" />
            {/* Texto flotante */}
            {showTooltip && (
              <div className="absolute left-12 bg-blue-600 text-white text-sm px-2 py-1 rounded-md whitespace-nowrap">
                Ver ciudades destacadas
              </div>
            )}
          </button>
        </div>
      )}

      {/* Modal de ciudades destacadas */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ x: '-100%', opacity: 0 }} // Animación inicial: fuera de la pantalla
            animate={{ x: 0, opacity: 1 }} // Animación al aparecer: desliza hacia la derecha
            exit={{ x: '-100%', opacity: 0 }} // Animación al cerrar: desliza hacia la izquierda
            transition={{ duration: 0.3 }} // Duración de la animación
            className="fixed left-0 top-0 h-full w-96 bg-gradient-to-b from-blue-500 to-blue-600 p-4 shadow-lg z-40"
          >
            {/* Botón para cerrar el modal */}
            <button
              onClick={handleModalToggle}
              className="absolute right-4 top-4 bg-red-600 p-2 rounded-full text-white hover:bg-red-700 transition duration-300"
              aria-label="Cerrar ciudades destacadas"
            >
              <FaTimes className="text-xl" />
            </button>

            <h2 className="text-2xl font-bold text-white mb-6">Ciudades destacadas</h2>
            <div className="space-y-4">
              {currentCities.map((cityData, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }} // Animación inicial de cada carta
                  animate={{ opacity: 1, y: 0 }} // Animación al aparecer
                  transition={{ duration: 0.5, delay: index * 0.1 }} // Retraso para animación escalonada
                  className="bg-white bg-opacity-90 p-4 rounded-lg shadow-lg flex items-center"
                >
                  <div className="mr-4">
                    {getWeatherIcon(cityData.current.condition.text)} {/* Usar el helper de íconos */}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {cityData.location.name}, {cityData.location.country}
                    </h3>
                    <p className="text-gray-700"><strong>Temperatura:</strong> {cityData.current.temp_c}°C</p>
                    <p className="text-gray-700"><strong>Condición:</strong> {cityData.current.condition.text}</p>
                    <p className="text-gray-700"><strong>Humedad:</strong> {cityData.current.humidity}%</p>
                    <p className="text-gray-700"><strong>Viento:</strong> {cityData.current.wind_kph} km/h</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};