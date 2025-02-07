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
      if (data && data.location) {
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
          className="bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition duration-300"
        >
          Buscar
        </button>
      </div>

      {/* Menú desplegable de sugerencias */}
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