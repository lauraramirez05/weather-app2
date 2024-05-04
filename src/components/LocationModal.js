import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { useWeatherContext } from '../utils/WeatherContext';
import { useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { GEO_API_URL, getApiOptions } from './GeoApi';

const LocationModal = () => {
  const { place, setPlace, locationModal, setLocationModal } =
    useWeatherContext();
  const [inputValue, setInputValue] = useState(null);

  const submitInput = (e) => {
    if (e.keyCode === 13) {
      console.log('pressed enter');
      if (inputValue !== null) {
        setPlace(inputValue);
        setInputValue('');
      }
      setLocationModal(false);
    }
  };

  const handleInputChange = (e) => {
    console.log('inside handleInputchange');
    console.log(e.target.value);
    setInputValue(e.target.value);
  };

  return (
    <div className={`location-container modal ${locationModal ? 'open' : ''}`}>
      <div className='modal-content'>
        <FontAwesomeIcon icon={faLocationDot} />
        <input
          type='text'
          placeholder='New York City, US'
          className='location'
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={submitInput}
        />
      </div>
    </div>
  );
};

export default LocationModal;
