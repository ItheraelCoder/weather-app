const API_KEY = import.meta.env.VITE_WEATHERAPI_KEY;

export const fetchWeatherData = async (location) => {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=3&lang=es`
    );

    if (!response.ok) {
      throw new Error('Error al obtener los datos del clima');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};