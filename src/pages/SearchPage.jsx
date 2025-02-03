import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchTerm, setWeatherData, setLoading, setError, toggleTemperatureUnit, addSearch } from '../store/';
import { fetchWeatherData, fetchAutocompleteSuggestions } from '../services/';  
import { FaSun, FaCloud, FaCloudRain, FaSnowflake } from 'react-icons/fa';
import { FeaturedCities, Forecast } from '../components/'
import { useNavigate } from 'react-router-dom'; // Para redirigir a WelcomePage

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
  const navigate = useNavigate();
  const { searchTerm, weatherData, isLoading, error, isCelsius } = useSelector((state) => state.search);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const data = await fetchWeatherData(inputValue);
      dispatch(setWeatherData(data));
      dispatch(setSearchTerm(inputValue));
      setShowSuggestions(false);

      // Guardar la búsqueda si el usuario está autenticado
      if (isAuthenticated) {
        dispatch(addSearch({ term: inputValue, timestamp: new Date().toISOString() }));
      }
    } catch (err) {
      dispatch(setError(err.message));
      dispatch(setWeatherData(null));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.length > 2) {
      try {
        const data = await fetchAutocompleteSuggestions(value);
        setSuggestions(data);
        setShowSuggestions(true);
      } catch (err) {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(`${suggestion.name}, ${suggestion.country}`);
    setShowSuggestions(false);
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
        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar ciudad o país..."
            value={inputValue}
            onChange={handleInputChange}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Buscando...' : 'Buscar'}
          </button>
          {showSuggestions && suggestions.length > 0 && (
            <div className="suggestions-dropdown">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.name}, {suggestion.country}
                </div>
              ))}
            </div>
          )}
        </div>
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
          <Forecast forecast={weatherData.forecast} />
        </div>
        
      )}

      {/* Botón para redirigir a WelcomePage */}
      <button onClick={() => navigate('/')} className="home-button">
        Volver a la página principal
      </button>
      
      <FeaturedCities />
    </div>
  );
};






