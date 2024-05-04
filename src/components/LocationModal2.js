import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { useWeatherContext } from '../utils/WeatherContext';
import { useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { GEO_API_URL, getApiOptions } from './GeoApi';

const LocationModal2 = () => {
  const { place, setPlace, locationModal, setLocationModal } =
    useWeatherContext();
  const [inputValue, setInputValue] = useState(null);

  const submitInput = (e) => {
    if (e.keyCode === 13) {
      console.log('pressed enter');
      e.preventDefault(); // Prevent the default form submission
      if (inputValue !== null) {
        setPlace(inputValue);
        setInputValue('');
      }
      setLocationModal(false);
    }
  };

  // const handleInputChange = (searchData) => {
  //   setPlace(searchData.value);
  // };

  const handleInputChange = (e) => {
    console.log(e.target.value);
  };

  const loadOptions = async (inputValue) => {
    try {
      const response = await fetch(
        `${GEO_API_URL}/cities?namePrefix=${inputValue}`,
        getApiOptions
      );
      const result = await response.json();
      return {
        options: result.data.map((city) => {
          return {
            value: `${city.name}, ${city.countryCode}`,
            label: `${city.name}, ${city.countryCode}`,
          };
        }),
      };
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='input2'>
      <div>
        <FontAwesomeIcon icon={faLocationDot} />
        <AsyncPaginate
          placeholder='Search for city'
          className='location'
          debounceTimeout={600}
          value={place}
          onChange={handleInputChange}
          onKeyDown={submitInput}
          loadOptions={loadOptions}
        />
      </div>
    </div>
  );
};

export default LocationModal2;
