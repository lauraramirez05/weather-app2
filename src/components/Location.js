import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { useWeatherContext } from '../utils/WeatherContext';
import { useState } from 'react';
import LocationModal from './LocationModal';
import LocationModal2 from './LocationModal2';

const Location = () => {
  const { place, setPlace, locationModal, setLocationModal } =
    useWeatherContext();

  const handleClick = () => {
    setLocationModal(true);
  };

  return (
    <div className='location-container'>
      <FontAwesomeIcon icon={faLocationDot} />
      <h2 onClick={handleClick}>{place}</h2>
      <LocationModal2 />
      {locationModal && <LocationModal2 />}
    </div>
  );
};

export default Location;
