
const API_KEY = import.meta.env.VITE_WEATHERAPI_KEY;

export const fetchAutocompleteSuggestions = async (query) => {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${query}`
    );

    if (!response.ok) {
      throw new Error('Error al obtener sugerencias');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};