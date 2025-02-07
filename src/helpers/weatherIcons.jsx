import { FaSun, FaCloud, FaCloudRain, FaSnowflake, FaCloudSun, FaSmog, FaBolt, FaCloudShowersHeavy } from 'react-icons/fa'; // Importa íconos de clima

// Función para obtener el ícono del clima basado en la condición
export const getWeatherIcon = (condition) => {
  const lowerCondition = condition.toLowerCase();
  if (lowerCondition.includes('sun') || lowerCondition.includes('clear')) {
    return <FaSun className="text-yellow-500 text-4xl" />;
  } else if (lowerCondition.includes('partly cloudy') || lowerCondition.includes('partly sunny')) {
    return <FaCloudSun className="text-yellow-500 text-4xl" />;
  } else if (lowerCondition.includes('cloud')) {
    return <FaCloud className="text-gray-500 text-4xl" />;
  } else if (lowerCondition.includes('rain') || lowerCondition.includes('shower')) {
    return <FaCloudRain className="text-blue-500 text-4xl" />;
  } else if (lowerCondition.includes('snow')) {
    return <FaSnowflake className="text-blue-300 text-4xl" />;
  } else if (lowerCondition.includes('thunder') || lowerCondition.includes('storm')) {
    return <FaBolt className="text-yellow-500 text-4xl" />;
  } else if (lowerCondition.includes('fog') || lowerCondition.includes('mist') || lowerCondition.includes('smog')) {
    return <FaSmog className="text-gray-500 text-4xl" />;
  } else {
    return <FaCloudShowersHeavy className="text-gray-500 text-4xl" />;
  }
};