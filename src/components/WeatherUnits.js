import { useWeatherContext } from '../utils/WeatherContext';

const WeatherUnits = () => {
  const { units, setUnits, darkMode } = useWeatherContext();

  const handleClick = (e) => {
    setUnits(e.target.innerText);
  };

  return (
    <div className='units-container'>
      <div
        className={`units ${units === 'F' ? 'active' : ''} ${
          darkMode ? 'dark' : ''
        }`}
        onClick={handleClick}
      >
        F
      </div>
      <div>/</div>
      <div
        className={`units ${units === 'C' ? 'active' : ''} ${
          darkMode ? 'dark' : ''
        }`}
        onClick={handleClick}
      >
        C
      </div>
    </div>
  );
};

export default WeatherUnits;
