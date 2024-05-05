import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { useWeatherContext } from '../utils/WeatherContext';
import LocationModal from './LocationModal';


const Location = () => {
  const { place, setPlace, locationModal, setLocationModal } =
    useWeatherContext();

  const handleClick = () => {
    setLocationModal(true);
  };
  console.log(locationModal);

  return (
    <div className='location-container'>
      <FontAwesomeIcon icon={faLocationDot} />
      <h2 onClick={handleClick}>{place}</h2>
      {/* <LocationModal2 /> */}
      {locationModal && <LocationModal />}
    </div>
  );
};

export default Location;
