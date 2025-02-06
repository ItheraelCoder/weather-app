import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchTerm, setLoading, setError } from '../store';
import PropTypes from 'prop-types';
import { fetchWeatherData } from '../services/weatherService';
import { fetchAutocompleteSuggestions } from '../services/autoCompleteService';

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
  
    console.log("Input value en SearchBar:", inputValue); // Verifica el valor de inputValue
    dispatch(setSearchTerm(inputValue));
    dispatch(setLoading(true));
    dispatch(setError(null));
  
    try {
      console.log("Llamando a fetchWeatherData con:", inputValue); // Verifica qué se está pasando a fetchWeatherData
      const data = await fetchWeatherData(inputValue); // Asignamos el resultado a data
      if (data && data.location) { // Validamos que los datos sean válidos
        onSearch(inputValue); // Pasa solo el término de búsqueda, no los datos completos
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
    setInputValue(value); // Actualiza inputValue con el valor del campo de búsqueda
  
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
    console.log("Sugerencia seleccionada:", suggestion); // Verifica la sugerencia seleccionada
    setInputValue(`${suggestion.name}, ${suggestion.country}`); // Asegúrate de que sea una cadena
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

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};