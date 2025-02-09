import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import {
  setSearchTerm, setWeatherData, setLoading, setError, toggleTemperatureUnit, addSearch,
} from '../store';
import { logout } from '../store';
import { SearchBar, SearchResults, FeaturedCities } from '../components/';
import { useEffect } from 'react';
import { ProfileButton } from '../helpers';
import { fetchWeatherData } from '../services/weatherService';
import '../styles/WeatherBGImage.css';
import { FaPowerOff } from 'react-icons/fa'; // Importar ícono de cerrar sesión

export const SearchPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { searchTerm, weatherData, isLoading, error, isCelsius } = useSelector((state) => state.search);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token || !isAuthenticated) {
      navigate('/login');
    }
  }, [navigate, isAuthenticated]);

  const handleSearch = async (query) => {
    if (!query) {
      dispatch(setError("Por favor, ingresa una ciudad o país."));
      return;
    }

    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const data = await fetchWeatherData(query);
      dispatch(setWeatherData(data));
      dispatch(setSearchTerm(data.location.name));

      if (isAuthenticated) {
        dispatch(addSearch({ term: data.location.name, timestamp: new Date().toISOString() }));
      }
    } catch (err) {
      dispatch(setError(err.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-600 p-4 weather-bgimage flex flex-col justify-between">
      {/* Barra de navegación */}
      <div className="bg-white bg-opacity-90 p-4 rounded-lg shadow-lg w-full max-w-4xl mx-auto mb-6 flex items-center justify-between space-x-4">
        {/* Contenedor para los botones de la izquierda */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigate('/')}
            className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300"
            aria-label="Volver al inicio"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </button>

          <ProfileButton />
        </div>

        <SearchBar onSearch={handleSearch} />

        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-300"
            aria-label="Cerrar sesión"
          >
            <FaPowerOff className="text-xl" />
          </button>
        )}
      </div>

      {/* Contenido principal */}
      <div className="w-full max-w-4xl mx-auto flex-grow">
        {searchTerm && <h2 className="text-2xl font-bold text-white text-center mb-4">Resultados para: {searchTerm}</h2>}
        {error && <p className="text-red-600 text-center">{error}</p>}
        {isLoading ? (
          <p className="text-white text-center">Cargando...</p>
        ) : (
          weatherData && (
            <SearchResults
              weatherData={weatherData}
              isCelsius={isCelsius}
              onToggleUnit={() => dispatch(toggleTemperatureUnit())}
            />
          )
        )}
      </div>

      {/* Contenedor para FeaturedCities */}
      <div className="w-full max-w-4xl mx-auto mt-8">
        <FeaturedCities />
      </div>
    </div>
  );
};
