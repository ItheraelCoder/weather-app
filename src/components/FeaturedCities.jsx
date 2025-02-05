import { useEffect, useState } from 'react';
import { fetchWeatherData } from '../services/weatherService';

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
    // Cambiar el conjunto de ciudades mostradas cada 10 segundos
    const interval = setInterval(() => {
      setCurrentSet((prevSet) => (prevSet + 1) % Math.ceil(cities.length / 4));
    }, 20000); // 10 segundos

    return () => clearInterval(interval); // Limpiar el intervalo al desmontar el componente
  }, [cities.length]);

  if (weatherData.length === 0) {
    return <div>Cargando ciudades destacadas...</div>;
  }

  // Obtener el conjunto actual de 4 ciudades
  const startIndex = currentSet * 4;
  const currentCities = weatherData.slice(startIndex, startIndex + 4);

  return (
    <div className="featured-cities">
      <h2>Ciudades destacadas</h2>
      <div className="cities-grid">
        {currentCities.map((cityData, index) => (
          <div key={index} className="city-weather">
            <h3>{cityData.location.name}, {cityData.location.country}</h3>
            <p><strong>Temperatura:</strong> {cityData.current.temp_c}°C</p>
            <p><strong>Condición:</strong> {cityData.current.condition.text}</p>
            <p><strong>Humedad:</strong> {cityData.current.humidity}%</p>
            <p><strong>Viento:</strong> {cityData.current.wind_kph} km/h</p>
          </div>
        ))}
      </div>
    </div>
  );
};