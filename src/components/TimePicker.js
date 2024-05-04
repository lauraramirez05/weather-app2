import { useWeatherContext } from '../utils/WeatherContext';

const TimePicker = () => {
  const { dayOfWeek, setDayOfWeek, setTime, time } = useWeatherContext();
  const handleDaySelect = (event) => {
    const dayId = event.target.value;
    setDayOfWeek(Number(dayId));
  };

  const handleTimeSelect = (event) => {
    const timeId = event.target.value;
    setTime(timeId);
  };

  return (
    <div className='time-container'>
      <select name='dayOfEvent' onChange={handleDaySelect}>
        <option value='0'>Every Sunday</option>
        <option value='1'>Every Monday</option>
        <option value='2'>Every Tuesday</option>
        <option value='3'>Every Wednesday</option>
        <option value='4'>Every Thursday</option>
        <option value='5'>Every Friday</option>
        <option value='6'>Every Saturday</option>
      </select>
      <select name='timeOfEvent' onChange={handleTimeSelect}>
        <option value='morning'>Morning</option>
        <option value='afternoon'>Afternoon</option>
        <option value='evening'>Evening</option>
      </select>
    </div>
  );
};

export default TimePicker;
