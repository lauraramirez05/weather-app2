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
      <select
        name='dayOfEvent'
        onChange={handleDaySelect}
        className='select-btn'
      >
        <option className='list-box' value='0'>
          Every Sunday
        </option>
        <option className='list-box' value='1'>
          Every Monday
        </option>
        <option className='list-box' value='2'>
          Every Tuesday
        </option>
        <option className='list-box' value='3'>
          Every Wednesday
        </option>
        <option className='list-box' value='4'>
          Every Thursday
        </option>
        <option className='list-box' value='5'>
          Every Friday
        </option>
        <option className='list-box' value='6'>
          Every Saturday
        </option>
      </select>
      <select
        name='timeOfEvent'
        onChange={handleTimeSelect}
        className='select-btn'
      >
        <option className='list-box' value='morning'>
          Morning
        </option>
        <option className='list-box' value='afternoon'>
          Afternoon
        </option>
        <option className='list-box' value='evening'>
          Evening
        </option>
      </select>
    </div>
  );
};

export default TimePicker;
