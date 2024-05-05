import './styles/styles.css';
import Navbar from './components/Navbar';
import Location from './components/Location';
// import TimeChooser from "./components/TimeChooser";
import TimePicker from './components/TimePicker';
import Weather from './components/Weather';
import { useWeatherContext } from './utils/WeatherContext';

const App = () => {
  const { darkMode } = useWeatherContext();
  return (
    <div className={`App ${darkMode ? 'dark' : ''}`}>
      <Navbar />
      <Location />
      <TimePicker />
      <Weather />
    </div>
  );
};

export default App;
