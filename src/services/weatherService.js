const API_KEY = import.meta.env.VITE_WEATHERAPI_KEY;

export const fetchWeatherData = async (location) => {
  try {
    const response = await fetch(
      
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=3&lang=es`
    );

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message); // Maneja errores de la API
    }

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};