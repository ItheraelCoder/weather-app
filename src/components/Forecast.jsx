import PropTypes from 'prop-types';

export const Forecast = ({ forecast }) => {
  if (!forecast || !forecast.forecastday) {
    return null; // Si no hay datos de pronóstico, no renderizar nada
  }

  return (
    <div className="forecast p-4">
      <h3>Pronóstico extendido</h3>
      <div className="forecast-days grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {forecast.forecastday.map((day, index) => (
          <div key={index} className="forecast-day bg-white bg-opacity-90 p-4 rounded-lg shadow-lg">
            <p><strong>Fecha:</strong> {day.date}</p>
            <p><strong>Máxima:</strong> {day.day.maxtemp_c}°C</p>
            <p><strong>Mínima:</strong> {day.day.mintemp_c}°C</p>
            <p><strong>Condición:</strong> {day.day.condition.text}</p>
          </div>
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