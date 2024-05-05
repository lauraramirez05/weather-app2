import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import LineChart from './LineChart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWind,
  faCloudRain,
  faTemperatureHalf,
} from '@fortawesome/free-solid-svg-icons';
import WeatherUnits from './WeatherUnits';
import Temperature from './Temperature';

const SliderComponent = ({ data, index }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    prevArrow: true,
    nextArrow: true,
  };

  return (
    <Slider {...settings}>
      <div className='weather-container weather-card' key={index}>
        {/* Render non-mobile UI */}
        <h1>{data.datetime.slice(0, -4)}</h1>
        <div className='weather-info-container'>
          <div className='weather-top'>
            <div className='weather-icon'>
              <img src={require(`../imgs/${data.icon}.png`)} />
            </div>
            <div className='weather-info'>
              <span className='temperature'>
                {/* {Math.round(data.temp)} */}
                <Temperature temp={data.temp} />°<WeatherUnits />
              </span>
              <span>{data.conditions}</span>
            </div>
          </div>
          <div className='weather-bottom'>
            <div className='details'>
              <FontAwesomeIcon icon={faWind} />
              <span>{Math.round(data.windspeed)}mph</span>
              <span>Wind</span>
            </div>
            <div className='details'>
              <FontAwesomeIcon icon={faCloudRain} />
              <span>{Math.round(data.precipprob)}%</span>
              <span>Rain</span>
            </div>
            <div className='details'>
              <FontAwesomeIcon icon={faTemperatureHalf} />
              <span>{Math.round(data.humidity)}%</span>
              <span>Humidity</span>
            </div>
          </div>
        </div>
        <LineChart data={data.hours} currentDay={data.datetime} />
      </div>
    </Slider>
  );
};

export default SliderComponent;
