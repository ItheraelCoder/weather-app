const API_KEY = import.meta.env.VITE_WEATHERAPI_KEY;

export const fetchWeatherData = async (location) => {
  try {
    
    // Convierte location a cadena de texto si es un objeto
    const locationString = typeof location === 'object' ? `${location.name}, ${location.country}` : location;
    console.log("URL de la API:", `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${locationString}&days=3&lang=es`); // Verifica la URL completa
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${locationString}&days=3&lang=es`
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