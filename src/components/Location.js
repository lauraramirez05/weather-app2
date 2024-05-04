import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { useWeatherContext } from '../utils/WeatherContext';
import { useState } from 'react';

const Location = () => {
  const { place, setPlace } = useWeatherContext();
  const [inputValue, setInputValue] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const submitInput = (e) => {
    console.log('before', place);
    if (e.keyCode === 13) {
      setPlace(inputValue);
    }
    console.log(place);
  };

  const handleInputChange = (e) => {
    console.log(e.target.value);
    setInputValue(e.target.value);
  };

  return (
    <div className='location-container'>
      <input
        type='text'
        placeholder='New York City, NY, United States'
        className='location'
        onChange={handleInputChange}
        onKeyDown={submitInput}
      />
    </div>
  );
};

export default Location;
