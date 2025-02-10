import { FaSun, FaCloud, FaCloudRain, FaSnowflake, FaCloudSun, FaSmog, FaBolt, FaCloudShowersHeavy } from 'react-icons/fa'; // Importa íconos de clima

export const getWeatherIcon = (condition) => {
  const lowerCondition = condition.toLowerCase().trim();
  console.log("Condition received:", lowerCondition);

  if (lowerCondition.includes('soleado') || lowerCondition.includes('despejado')) {
    return <FaSun className="text-yellow-500 text-4xl" />;
  } else if (lowerCondition.includes('parcialmente nublado') || lowerCondition.includes('parcialmente soleado')) {
    return <FaCloudSun className="text-yellow-500 text-4xl" />;
  } else if (lowerCondition.includes('nublado')) {
    return <FaCloud className="text-gray-500 text-4xl" />;
  } else if (lowerCondition.includes('rain') || lowerCondition.includes('ligeras precipitaciones de aguanieve')) {
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