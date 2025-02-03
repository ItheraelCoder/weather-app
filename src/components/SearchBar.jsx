import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchTerm, setLoading, setError } from '../store';
import { fetchWeatherData } from '../services/weatherService';
import { fetchAutocompleteSuggestions } from '../services/autocompleteService';

export const SearchBar = ({ onSearch }) => {
  const dispatch = useDispatch();
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
      onSearch(data); // Pasa los datos al componente padre
      setShowSuggestions(false);
    } catch (err) {
      dispatch(setError(err.message));
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

  return (
    <form onSubmit={handleSearch} className="search-bar">
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar ciudad o país..."
          value={inputValue}
          onChange={handleInputChange}
        />
        <button type="submit">Buscar</button>
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
  );
};