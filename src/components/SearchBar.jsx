import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchTerm, setLoading, setError } from '../store';
import PropTypes from 'prop-types';
import { fetchWeatherData } from '../services/weatherService';
import { fetchAutocompleteSuggestions } from '../services/autoCompleteService';
import { FaSearch } from 'react-icons/fa';

export const SearchBar = ({ onSearch }) => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) {
      dispatch(setError("Por favor, ingresa una ciudad o país."));
      return;
    }

    dispatch(setSearchTerm(inputValue));
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const data = await fetchWeatherData(inputValue);
      if (data && data.location) {
        onSearch(inputValue);
        setShowSuggestions(false);
      } else {
        dispatch(setError("No se encontraron datos válidos para la ubicación."));
      }
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
      } catch {
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
    <form onSubmit={handleSearch} className="relative w-full max-w-md">
      <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
        <input
          type="text"
          placeholder="Buscar ciudad o país..."
          value={inputValue}
          onChange={handleInputChange}
          className="flex-1 p-2 outline-none"
        />
        <button
          type="submit"
          className="p-3 bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 flex items-center justify-center"
          aria-label="Buscar"
        >
          <FaSearch className="text-xl" />
        </button>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1 max-h-48 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.name}, {suggestion.country}
            </div>
          ))}
        </div>
      )}
    </form>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};