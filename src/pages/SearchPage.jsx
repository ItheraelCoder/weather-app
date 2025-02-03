import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { setSearchTerm, setWeatherData, setLoading, setError, toggleTemperatureUnit, addSearch} from '../store';
import { logout } from '../store/auth/authSlice';
import { SearchBar, SearchResults, FeaturedCities } from '../components/';
import { useEffect } from 'react';

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
  }, [navigate, isAuthenticated]); // Añade isAuthenticated como dependencia

  const handleSearch = (data) => {
    dispatch(setWeatherData(data));
    dispatch(setSearchTerm(data.location.name));

    // Guardar la búsqueda si el usuario está autenticado
    if (isAuthenticated) {
      dispatch(addSearch({ term: data.location.name, timestamp: new Date().toISOString() }));
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className="search-page">
      <h1>Buscador del clima</h1>
      <SearchBar onSearch={handleSearch} />
      {error && <p className="error">{error}</p>}
      <SearchResults
        weatherData={weatherData}
        isCelsius={isCelsius}
        onToggleUnit={() => dispatch(toggleTemperatureUnit())}
      />
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







