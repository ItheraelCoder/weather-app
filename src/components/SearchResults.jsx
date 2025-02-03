import { FaSun, FaCloud, FaCloudRain, FaSnowflake } from 'react-icons/fa';
import { Forecast } from './Forecast';

const getWeatherIcon = (condition) => {
  switch (condition.toLowerCase()) {
    case 'sunny':
      return <FaSun className="weather-icon" />;
    case 'cloudy':
      return <FaCloud className="weather-icon" />;
    case 'rainy':
      return <FaCloudRain className="weather-icon" />;
    case 'snowy':
      return <FaSnowflake className="weather-icon" />;
    default:
      return <FaSun className="weather-icon" />;
  }
};

export const SearchResults = ({ weatherData, isCelsius, onToggleUnit }) => {
  if (!weatherData) return null;

  const temperature = isCelsius
    ? `${weatherData.current.temp_c}°C`
    : `${weatherData.current.temp_f}°F`;

  return (
    <div className="search-results">
      <h2>Resultados para "{weatherData.location.name}"</h2>
      {getWeatherIcon(weatherData.current.condition.text)}
      <div className="weather-info">
        <p><strong>Ubicación:</strong> {weatherData.location.name}, {weatherData.location.country}</p>
        <p><strong>Temperatura:</strong> {temperature}</p>
        <p><strong>Condición:</strong> {weatherData.current.condition.text}</p>
        <p><strong>Humedad:</strong> {weatherData.current.humidity}%</p>
        <p><strong>Viento:</strong> {weatherData.current.wind_kph} km/h</p>
      </div>
      <button onClick={onToggleUnit}>
        Cambiar a {isCelsius ? 'Fahrenheit' : 'Celsius'}
      </button>

      {/* Pronóstico extendido */}
      <Forecast forecast={weatherData.forecast} />
    </div>
  );
};
