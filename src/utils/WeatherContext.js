import React, { createContext, useContext, useState } from 'react';

export const WeatherContext = createContext();

//Create a provider component
const WeatherProvider = ({ children }) => {
  //define the states provided
  const [dayOfWeek, setDayOfWeek] = useState(0);
  const [time, setTime] = useState('morning');
  const [place, setPlace] = useState('New York City, US');
  const [locationModal, setLocationModal] = useState(false);
  const [filteredDays, setFilteredDays] = useState([]);
  const [units, setUnits] = useState('F');

  return (
    <WeatherContext.Provider
      value={{
        dayOfWeek,
        setDayOfWeek,
        time,
        setTime,
        place,
        setPlace,
        locationModal,
        setLocationModal,
        filteredDays,
        setFilteredDays,
        units,
        setUnits,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

//Custom hook to consume the useContext
const useWeatherContext = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeatherContext must be used within a WeatherProvider');
  }
  return context;
};

export { WeatherProvider, useWeatherContext };
