import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchTerm, setResults, setLoading, setError } from '../store/search/searchSlice';
import '../styles/SearchPage.css'

export const SearchPage = () => {
  const dispatch = useDispatch();
  const { searchTerm, results, isLoading, error } = useSelector((state) => state.search);
  const [inputValue, setInputValue] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=TU_API_KEY&q=${inputValue}`
      );
      const data = await response.json();

      if (data.error) {
        dispatch(setError(data.error.message));
      } else {
        dispatch(setResults([data])); // Guarda los resultados en el store
        dispatch(setSearchTerm(inputValue));
      }
    } catch (err) {
      dispatch(setError('Error al realizar la búsqueda'));
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

      {results.length > 0 && (
        <div className="results">
          <h2>Resultados para {searchTerm}</h2>
          <ul>
            {results.map((result) => (
              <li key={result.id}>{result.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
