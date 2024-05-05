import { useWeatherContext } from '../utils/WeatherContext';
import { useState, useEffect } from 'react';
import LineChart from './LineChart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWind,
  faCloudRain,
  faTemperatureHalf,
} from '@fortawesome/free-solid-svg-icons';
import WeatherUnits from './WeatherUnits';
import Temperature from './Temperature';
import AccordionComponent from './AccordionComponent';
import useMobileDetector from '../utils/MobileDetectorHook';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Alert from '@mui/material/Alert';

const Weather = () => {
  const {
    dayOfWeek,
    setPlace,
    place,
    time,
    filteredDays,
    setFilteredDays,
    isMobile,
    darkMode,
  } = useWeatherContext();
  const [data, setData] = useState(null);

  //Custom hook to look for changes in the screen
  const screenSize = useMobileDetector();

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1281 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1280, min: 600 },
      items: 2,
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${place}/next20days?key=${process.env.REACT_APP_WEATHER_API_KEY}`
        );
        if (!response.ok) {
          alert("The city you are looking for doesn't exist. Check spelling");
          setPlace('New York City, US');
          throw new Error(`Network response was not ok ${response.status}`);
        }
        const jsonData = await response.json();
        const { days, resolvedAddress } = jsonData;
        setData({ days });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [place, dayOfWeek]);

  //Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });

    const month = date.toLocaleDateString('en-US', { month: 'long' });

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
          return date.getDay() === dayOfWeek; // Sunday is index 1
        })
        .map((day) => {
          if (day.hours) {
            const filteredWeatherByHour = day.hours.filter((hour) => {
              let timeArray = hour.datetime.split(':');
              if (time === 'morning') {
                return timeArray[0] >= '07' && timeArray[0] <= '13';
              } else if (time === 'afternoon') {
                return timeArray[0] >= '11' && timeArray[0] <= '18';
              } else if (time === 'evening') {
                return timeArray[0] >= '14' && timeArray[0] <= '22';
              }
            });
            return {
              ...day,
              hours: filteredWeatherByHour,
            };
          } else {
            return day; // Return day without modification if hours is not defined
          }
        });
      setFilteredDays(transformedDays);
    }
  }, [data, dayOfWeek, time]);

  return (
    <>
      {isMobile ? (
        filteredDays.map((day, index) => (
          <AccordionComponent data={day} index={index} key={index} />
        ))
      ) : (
        <Carousel responsive={responsive}>
          {filteredDays.map((day, index) => (
            <div className='weather-container' key={index}>
              {/* Render non-mobile UI */}
              <h1>{day.datetime.slice(0, -4)}</h1>
              <div
                className={`weather-info-container ${
                  darkMode ? 'secondary-dark' : ''
                }`}
              >
                <div className='weather-top'>
                  <div className='weather-icon'>
                    <img src={require(`../imgs/${day.icon}.png`)} />
                  </div>
                  <div className='weather-info'>
                    <span className='temperature'>
                      {/* {Math.round(day.temp)} */}
                      <Temperature temp={day.temp} />°<WeatherUnits />
                    </span>
                    <span>{day.conditions}</span>
                  </div>
                </div>
                <div className='weather-bottom'>
                  <div className='details'>
                    <FontAwesomeIcon icon={faWind} />
                    <span>{Math.round(day.windspeed)}mph</span>
                    <span>Wind</span>
                  </div>
                  <div className='details'>
                    <FontAwesomeIcon icon={faCloudRain} />
                    <span>{Math.round(day.precipprob)}%</span>
                    <span>Rain</span>
                  </div>
                  <div className='details'>
                    <FontAwesomeIcon icon={faTemperatureHalf} />
                    <span>{Math.round(day.humidity)}%</span>
                    <span>Humidity</span>
                  </div>
                </div>
              </div>
              {day.hours && day.hours.length > 0 ? (
                <LineChart data={day.hours} currentDay={day.datetime} />
              ) : (
              <div className='alert'>
              <Alert severity='info'>No data available yet</Alert>
              </div>
                
              )}
            </div>
          ))}
        </Carousel>
      )}
    </>
  );
};

export default Weather;
