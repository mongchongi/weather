import { useEffect, useState } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import Weather from './components/Weather';
import City from './components/City';

const OPEN_WEATHER_API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

const App = () => {
  const [weather, setWeather] = useState(null);

  const getWeatherByCurrentLocation = async (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_API_KEY}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();
    setWeather(data);
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    });
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <div className='container'>
      <div className='location'>
        <FontAwesomeIcon icon={faLocationDot} />
        <p className='location__name'>{weather?.name}</p>
      </div>
      <div className='weather-section'>
        <Weather weather={weather} />
        <City />
      </div>
    </div>
  );
};

export default App;
