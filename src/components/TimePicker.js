import { useWeatherContext } from '../utils/WeatherContext';

const TimePicker = () => {
  const { dayOfWeek, setDayOfWeek } = useWeatherContext();
  const handleSelect = (event) => {
    const dayId = event.target.value;
    setDayOfWeek(Number(dayId));
  };

  return (
    <div className='time-container'>
      <select name='dayOfEvent' onChange={handleSelect}>
        <option value='0'>Every Monday</option>
        <option value='1'>Every Tuesday</option>
        <option value='2'>Every Wednesday</option>
        <option value='3'>Every Thursday</option>
        <option value='4'>Every Friday</option>
        <option value='5'>Every Saturday</option>
        <option value='6'>Every Friday</option>
      </select>
      <select name='timeOfEvent'>
        <option value='morning'>Morning</option>
        <option value='afternoon'>Afternoon</option>
        <option value='evening'>Evening</option>
      </select>
    </div>
  );
};

export default TimePicker;
