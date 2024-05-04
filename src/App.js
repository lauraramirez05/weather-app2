import './styles/styles.css';
import Navbar from './components/Navbar';
import Location from './components/Location';
// import TimeChooser from "./components/TimeChooser";
import TimePicker from './components/TimePicker';
import Weather from './components/Weather';
import { WeatherProvider } from './utils/WeatherContext';

const App = () => {
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
