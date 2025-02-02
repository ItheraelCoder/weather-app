import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchTerm, setWeatherData, setLoading, setError, toggleTemperatureUnit } from '../store/search/searchSlice';
import { fetchWeatherData } from '../services/weatherService';
import { FaSun, FaCloud, FaCloudRain, FaSnowflake } from 'react-icons/fa';

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

export const SearchPage = () => {
  const dispatch = useDispatch();
  const { searchTerm, weatherData, isLoading, error, isCelsius } = useSelector((state) => state.search);
  const [inputValue, setInputValue] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const data = await fetchWeatherData(inputValue);
      dispatch(setWeatherData(data));
      dispatch(setSearchTerm(inputValue));
    } catch (err) {
      dispatch(setError(err.message));
      dispatch(setWeatherData(null));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const temperature = weatherData
    ? isCelsius
      ? `${weatherData.current.temp_c}°C`
      : `${weatherData.current.temp_f}°F`
      : 'N/A';

  return (
    <div className="search-page">
      <h1>Buscador del clima</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Buscar ciudad..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Buscando...' : 'Buscar'}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {weatherData && (
        <div className="results">
          <h2>Resultados para {searchTerm}</h2>
          {getWeatherIcon(weatherData.current.condition.text)}
          <div className="weather-info">
            <p><strong>Ubicación:</strong> {weatherData.location.name}, {weatherData.location.country}</p>
            <p><strong>Temperatura:</strong> {temperature}</p>
            <p><strong>Condición:</strong> {weatherData.current.condition.text}</p>
            <p><strong>Humedad:</strong> {weatherData.current.humidity}%</p>
            <p><strong>Viento:</strong> {weatherData.current.wind_kph} km/h</p>
          </div>
          <button onClick={() => dispatch(toggleTemperatureUnit())}>
            Cambiar a {isCelsius ? 'Fahrenheit' : 'Celsius'}
          </button>
        </div>
      )}
    </div>
  );
};





