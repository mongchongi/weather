import { faDroplet, faWind } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Weather = ({ weather }) => {
  return (
    <div className='weather'>
      <div className='weather__info'>
        <div className='weather__temperature'>
          <h2 className='weather__celsius'>{Math.round(weather?.main.temp)}℃</h2>
          <h3 className='weather__fahrenheit'>{Math.round(weather?.main.temp * 1.8 + 32)}°F</h3>
        </div>
        <p className='weather__description'>{weather?.weather[0].description}</p>
        <div className='weather__details'>
          <div className='weather__wind'>
            <h4>
              <FontAwesomeIcon icon={faWind} />
              Wind
            </h4>
            <p>{weather?.wind.speed}km/h</p>
          </div>
          <div className='weather__humidity'>
            <h4>
              <FontAwesomeIcon icon={faDroplet} />
              Humidity
            </h4>
            <p>{weather?.main.humidity}%</p>
          </div>
        </div>
      </div>
      <img
        className='weather__condition'
        src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon.replace('n', 'd')}@2x.png`}
        alt='scattered clouds'
      />
    </div>
  );
};

export default Weather;
