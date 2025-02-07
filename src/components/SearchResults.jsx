import { Forecast } from './Forecast';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion'; // Importa Framer Motion para animaciones
import { getWeatherIcon } from '../helpers/'; // Importa la función desde el nuevo servicio

export const SearchResults = ({ weatherData, isCelsius, onToggleUnit }) => {
  if (!weatherData) return null;

  const temperature = isCelsius
    ? `${weatherData.current.temp_c}°C`
    : `${weatherData.current.temp_f}°F`;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }} // Animación inicial
        animate={{ opacity: 1, y: 0 }} // Animación al aparecer
        transition={{ duration: 0.5 }} // Duración de la animación
        className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-4xl mx-auto mt-6"
      >
        {/* Icono del clima */}
        <div className="flex justify-center mb-6">
          {getWeatherIcon(weatherData.current.condition.text)}
        </div>
  
        {/* Información del clima */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="font-semibold">Ubicación:</p>
            <p>{weatherData.location.name}, {weatherData.location.country}</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="font-semibold">Temperatura:</p>
            <p>{temperature}</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="font-semibold">Condición:</p>
            <p>{weatherData.current.condition.text}</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="font-semibold">Humedad:</p>
            <p>{weatherData.current.humidity}%</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="font-semibold">Viento:</p>
            <p>{weatherData.current.wind_kph} km/h</p>
          </div>
        </div>
  
        {/* Botón para cambiar la unidad de temperatura */}
        <div className="flex justify-center mt-6">
          <button
            onClick={onToggleUnit}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Cambiar a {isCelsius ? 'Fahrenheit' : 'Celsius'}
          </button>
        </div>
  
        {/* Pronóstico extendido */}
        <div className="mt-8">
          <Forecast forecast={weatherData.forecast} />
        </div>
      </motion.div>
    );
  };
  
  SearchResults.propTypes = {
    weatherData: PropTypes.shape({
      location: PropTypes.shape({
        name: PropTypes.string.isRequired,
        country: PropTypes.string.isRequired,
      }).isRequired,
      current: PropTypes.shape({
        temp_c: PropTypes.number.isRequired,
        temp_f: PropTypes.number.isRequired,
        condition: PropTypes.shape({
          text: PropTypes.string.isRequired,
        }).isRequired,
        humidity: PropTypes.number.isRequired,
        wind_kph: PropTypes.number.isRequired,
      }).isRequired,
      forecast: PropTypes.object.isRequired,
    }).isRequired,
    isCelsius: PropTypes.bool.isRequired,
    onToggleUnit: PropTypes.func.isRequired,
  };