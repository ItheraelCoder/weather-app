import '../styles/Forecast.css';

export const Forecast = ({ forecast }) => {
  if (!forecast || !forecast.forecastday) {
    return null; // Si no hay datos de pronóstico, no renderizar nada
  }

  return (
    <div className="forecast">
      <h3>Pronóstico extendido</h3>
      <div className="forecast-days">
        {forecast.forecastday.map((day, index) => (
          <div key={index} className="forecast-day">
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


