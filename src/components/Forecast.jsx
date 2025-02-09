import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { getWeatherIcon } from '../helpers';

export const Forecast = ({ forecast }) => {
  if (!forecast || !forecast.forecastday) {
    return null;
  }

  // Animación para las tarjetas
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="forecast p-4 w-full">
      <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Pronóstico extendido</h3>
      <div className="forecast-days grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
        {forecast.forecastday.map((day, index) => (
          <motion.div
            key={index}
            className="forecast-day bg-white bg-opacity-90 p-6 rounded-lg shadow-lg flex flex-col items-center space-y-4"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.2, duration: 0.5 }}
          >
            {/* Fecha */}
            <p className="text-lg font-semibold text-gray-800">{day.date}</p>

            {/* Ícono del clima */}
            <div className="text-6xl">
              {getWeatherIcon(day.day.condition.text)}
            </div>

            {/* Temperaturas */}
            <div className="text-center">
              <p className="text-gray-700">
                <strong>Máxima:</strong> {day.day.maxtemp_c}°C
              </p>
              <p className="text-gray-700">
                <strong>Mínima:</strong> {day.day.mintemp_c}°C
              </p>
            </div>

            {/* Condición del clima */}
            <p className="text-gray-600 text-center">
              <strong>Condición:</strong> {day.day.condition.text}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

Forecast.propTypes = {
  forecast: PropTypes.shape({
    forecastday: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string.isRequired,
        day: PropTypes.shape({
          maxtemp_c: PropTypes.number.isRequired,
          mintemp_c: PropTypes.number.isRequired,
          condition: PropTypes.shape({
            text: PropTypes.string.isRequired,
          }).isRequired,
        }).isRequired,
      }).isRequired
    ).isRequired,
  }).isRequired,
};