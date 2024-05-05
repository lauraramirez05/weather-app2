import { useWeatherContext } from '../utils/WeatherContext';

const Temperature = ({ temp }) => {
  const { units } = useWeatherContext();

  const convertToCelsius = (farenheit) => {
    return ((farenheit - 32) * 5) / 9;
  };

  const convertedTemp = units === 'F' ? temp : convertToCelsius(temp);

  return <>{Math.round(convertedTemp)}</>;
};

export default Temperature;
