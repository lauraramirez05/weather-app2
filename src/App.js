import './styles/styles.css';
import Navbar from './components/Navbar';
import Location from './components/Location';
// import TimeChooser from "./components/TimeChooser";
import TimePicker from './components/TimePicker';
import Weather from './components/Weather';
import { WeatherProvider } from './utils/WeatherContext';

const App = () => {
  console.log('KEY', process.env.REACT_APP_WEATHER_API_KEY);
  console.log('KEYW', process.env.REACT_APP_KEY);
  return (
    <WeatherProvider>
      <div className='App'>
        <Navbar />
        <Location />
        <TimePicker />
        {/* <TimeChooser /> */}
        <Weather />
      </div>
    </WeatherProvider>
  );
};

export default App;
