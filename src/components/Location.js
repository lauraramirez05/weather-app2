import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { useWeatherContext } from '../utils/WeatherContext';
import AutoSuggest from './AutoSuggest';

const Location = () => {
  const { place, locationModal, setLocationModal } = useWeatherContext();

  const handleClick = () => {
    setLocationModal(true);
  };

  return (
    <div className='location-container'>
      <FontAwesomeIcon icon={faLocationDot} />
      <h2 onClick={handleClick}>{place}</h2>
      {locationModal && <AutoSuggest />}
    </div>
  );
};

export default Location;
