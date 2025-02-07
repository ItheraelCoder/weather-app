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
import '../styles/WeatherBGImage.css'

export const SearchPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { searchTerm, weatherData, isLoading, error, isCelsius } = useSelector((state) => state.search);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token || !isAuthenticated) {
      navigate('/login'); // Redirige al usuario si no hay token o no está autenticado
    }
  }, [navigate, isAuthenticated]);

  const handleSearch = async (query) => {
    if (!query) {
      dispatch(setError("Por favor, ingresa una ciudad o país.")); // Muestra un mensaje de error si está vacío
      return;
    }

    console.log("Query value en SearchPage:", query); // Verifica el valor de query
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      console.log("Llamando a fetchWeatherData con:", query); // Verifica qué se está pasando a fetchWeatherData
      const data = await fetchWeatherData(query);
      dispatch(setWeatherData(data));
      dispatch(setSearchTerm(data.location.name));

      if (isAuthenticated) {
        dispatch(addSearch({ term: data.location.name, timestamp: new Date().toISOString() }));
      }
    } catch (err) {
      dispatch.setError(err.message);
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
      {/* Barra de navegación flotante */}
      <div className="bg-white bg-opacity-90 p-4 rounded-lg shadow-lg fixed top-4 left-1/2 transform -translate-x-1/2 w-full max-w-4xl mx-auto flex items-center justify-between space-x-4 z-50">
        <button
          onClick={() => navigate('/')}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Volver a la página principal
        </button>
        <ProfileButton />
        <SearchBar onSearch={handleSearch} />
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-300"
          >
            Cerrar sesión
          </button>
        )}
      </div>

      {/* Contenido principal */}
      <div className="pt-24 w-full max-w-4xl mx-auto flex-grow">
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
      <div className="w-full max-w-4xl mx-auto mt-8"> {/* Agregué mt-8 para espaciado */}
        <FeaturedCities /> {/* FeaturedCities se posiciona en la parte inferior */}
      </div>
    </div>
  );
};