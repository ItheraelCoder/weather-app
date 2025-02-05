import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import {
  setSearchTerm, setWeatherData, setLoading, setError, toggleTemperatureUnit, addSearch,
} from '../store';
import { logout } from '../store/auth/authSlice';
import { SearchBar, SearchResults, FeaturedCities } from '../components/';
import { useEffect } from 'react';
import { ProfileButton } from '../helpers';
import { fetchWeatherData } from '../services/weatherService';

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
    <div className="search-page">
      <h1>Buscador del clima</h1>
      <ProfileButton />
      <SearchBar onSearch={handleSearch} />
      {error && <p className="error">{error}</p>}
      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        weatherData && (
          <SearchResults
            weatherData={weatherData}
            isCelsius={isCelsius}
            onToggleUnit={() => dispatch(toggleTemperatureUnit())}
          />
        )
      )}
      <button onClick={() => navigate('/')} className="home-button">
        Volver a la página principal
      </button>
      {isAuthenticated && (
        <button onClick={handleLogout} className="logout-button">
          Cerrar sesión
        </button>
      )}
      <FeaturedCities />
    </div>
  );
};