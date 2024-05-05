import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSnowflake } from '@fortawesome/free-solid-svg-icons';
import { SwitchMode } from './SwitchMode.js';
import { useWeatherContext } from '../utils/WeatherContext.js';
const Navbar = () => {
  const { darkMode, setDarkMode } = useWeatherContext();

  return (
    <nav className={`${darkMode ? 'dark' : ''}`}>
      <div className='name-app'>
        <FontAwesomeIcon icon={faSnowflake} />
        <h1>ForecastPrep</h1>
      </div>
      <SwitchMode />
    </nav>
  );
};

export default Navbar;
