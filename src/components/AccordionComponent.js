import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import LineChart from './LineChart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWind,
  faCloudRain,
  faTemperatureHalf,
} from '@fortawesome/free-solid-svg-icons';
import WeatherUnits from './WeatherUnits';
import Temperature from './Temperature';

const AccordionComponent = ({ data, index }) => {
  console.log(data);
  return (
    <>
      <Accordion
        key={index}
        defaultExpanded={index === 0}
        style={{ overflow: 'auto' }}
      >
        <AccordionSummary key={index} className='accordion-summary'>
          <h1>{data.datetime.slice(0, -4)}</h1>
        </AccordionSummary>
        <AccordionDetails style={{ overflow: 'auto' }}>
          <div className='weather-container'>
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
            {data.hours && data.hours.length > 0 && (
              <LineChart data={data.hours} currentDay={data.datetime} />
            )}
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default AccordionComponent;
