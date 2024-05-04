import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { useWeatherContext } from '../utils/WeatherContext';
import { useState } from 'react';

const LocationModal = () => {
  const { place, setPlace, locationModal, setLocationModal } =
    useWeatherContext();
  const [inputValue, setInputValue] = useState(null);

  const submitInput = (e) => {
    console.log('before', place);
    if (e.keyCode === 13) {
      if (inputValue !== null) {
        setPlace(inputValue);
        setInputValue('');
      }
      setLocationModal(false);
    }
    console.log(place);
  };

  const handleInputChange = (e) => {
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
