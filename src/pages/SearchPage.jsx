import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchTerm, setWeatherData, setLoading, setError } from '../store/search/searchSlice';
import { fetchWeatherData } from '../services/weatherService';

export const SearchPage = () => {
  const dispatch = useDispatch();
  const { searchTerm, weatherData, isLoading, error } = useSelector((state) => state.search);
  const [inputValue, setInputValue] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return; // Evita búsquedas vacías

    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const data = await fetchWeatherData(inputValue); // Llama a la API
      dispatch(setWeatherData(data)); // Guarda los datos del clima en el store
      dispatch(setSearchTerm(inputValue)); // Guarda el término de búsqueda
    } catch (err) {
      dispatch(setError(err.message)); // Maneja errores
    } finally {
      dispatch(setLoading(false));
    }
  };

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
          <div className="weather-info">
            <p><strong>Ubicación:</strong> {weatherData.location.name}, {weatherData.location.country}</p>
            <p><strong>Temperatura:</strong> {weatherData.current.temp_c}°C</p>
            <p><strong>Condición:</strong> {weatherData.current.condition.text}</p>
            <p><strong>Humedad:</strong> {weatherData.current.humidity}%</p>
            <p><strong>Viento:</strong> {weatherData.current.wind_kph} km/h</p>
          </div>
        </div>
      )}
    </div>
  );
};


