import { useWeatherContext } from '../utils/WeatherContext';

const WeatherUnits = () => {
  const { units, setUnits } = useWeatherContext();

  const handleClick = (e) => {
    setUnits(e.target.innerText);
  };

  return (
    <div className='units-container'>
      <div
        className={`units ${units === 'F' ? 'active' : ''}`}
        onClick={handleClick}
      >
        F
      </div>
      <div>/</div>
      <div
        className={`units ${units === 'C' ? 'active' : ''}`}
        onClick={handleClick}
      >
        C
      </div>
    </div>
  );
};

export default WeatherUnits;
