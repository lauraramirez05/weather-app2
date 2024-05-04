import { useWeatherContext } from '../utils/WeatherContext';
import { useState, useEffect } from 'react';
import LineChart from './LineChart';

const Weather = () => {
  const { dayOfWeek, place, time, filteredDays, setFilteredDays } =
    useWeatherContext();
  const [data, setData] = useState(null);
  console.log(place);

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

  //Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    //Get the day of the week
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });

    //Get the month
    const month = date.toLocaleDateString('en-US', { month: 'long' });

    //Get the day of the month
    const dayOfMonth = date.getDate();

    const year = date.getFullYear();

    const formattedDate = `${dayOfWeek}, ${month} ${dayOfMonth} ${year}`;

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
          return date.getDay() === dayOfWeek; // Tuesday has index 2 (0 for Sunday, 1 for Monday, ...)
        })
        .map((day) => {
          const weatherByHour = day.hours;
          const filteredWeatherByHour = weatherByHour.filter((hour) => {
            let timeArray = hour.datetime.split(':');
            if (time === 'morning') {
              return timeArray[0] >= '08' && timeArray[0] <= '12';
            } else if (time === 'afternoon') {
              return timeArray[0] >= '12' && timeArray[0] <= '17';
            } else if (time === 'evening') {
              return timeArray[0] >= '17' && timeArray[0] <= '21';
            }
          });
          return {
            ...day,
            hours: filteredWeatherByHour,
          };
        });
      setFilteredDays(transformedDays);
    }
  }, [data, dayOfWeek, time]);

  return (
    <>
      {filteredDays.map((day) => (
        <div className='weather-container'>
          <h1>{day.datetime.slice(0, -4)}</h1>
          <div className='weather-info-container'>
            <div className='weather-icon'>{day.icon}</div>
            <div className='weather-info'>
              <span className='temperature'>{Math.round(day.temp)}°</span>
              <span>{day.conditions}</span>
              <span>Winds: {day.windspeed}mph</span>
              <span>Chance of Rain: </span>
            </div>
          </div>
          <LineChart data={day.hours} currentDay={day.datetime} />
        </div>
      ))}
    </>
  );
};

export default Weather;
