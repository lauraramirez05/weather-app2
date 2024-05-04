import { useWeatherContext } from '../utils/WeatherContext';
import { useState, useEffect } from 'react';

const Weather = () => {
  const { dayOfWeek, place } = useWeatherContext();
  const [data, setData] = useState(null);
  const [filteredDays, setFilteredDays] = useState([]);
  console.log(dayOfWeek);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${place}/next10days?key=HC5DWBUHKBB7LJEBFWJQ4KKQJ`
        );
        if (!response.ok) {
          throw new Error(`Network response was not ok ${response.status}`);
        }
        const jsonData = await response.json();
        const { days } = jsonData;
        setData({ days });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [dayOfWeek, place]);

  console.log(data);
  console.log('DAY OF WEEK', dayOfWeek);
  //Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    //Get the day of the week
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });

    //Get the month
    const month = date.toLocaleDateString('en-US', { month: 'long' });

    //Get the day of the month
    const dayOfMonth = date.getDate();

    const formattedDate = `${dayOfWeek}, ${month} ${dayOfMonth}`;

    return formattedDate;
  };

  // Transform and filter the data
  useEffect(() => {
    if (data) {
      const transformedDays = data.days
        .map((day) => ({
          ...day,
          datetime: formatDate(day.datetime),
        }))
        .filter((day) => {
          const date = new Date(day.datetime);
          console.log([date.getDay(), dayOfWeek]);
          return date.getDay() === dayOfWeek; // Tuesday has index 2 (0 for Sunday, 1 for Monday, ...)
        });
      console.log(transformedDays);
      setFilteredDays(transformedDays);
    }
  }, [data, dayOfWeek]);

  return (
    <>
      {filteredDays.map((day) => (
        <div className='weather-container'>
          <h1>{day.datetime}</h1>
          <div className='weather-info-container'>
            <div className='weather-icon'>{day.icon}</div>
            <div className='weather-info'>
              <span className='temperature'>{Math.round(day.temp)}°</span>
              <span>{day.conditions}</span>
              <span>Winds: {day.windspeed}mph</span>
              <span>Chance of Rain: </span>
            </div>
          </div>
          <div className='weather-graph'></div>
        </div>
      ))}
    </>
  );
};

export default Weather;
