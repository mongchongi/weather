import { useEffect, useRef, useState } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Weather from './components/Weather';
import City from './components/City';

const OPEN_WEATHER_API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

const App = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const searchInputRef = useRef(null);

  const cities = ['seoul', 'tokyo', 'paris', 'new york'];

  const getWeatherByCurrentLocation = async (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_API_KEY}&units=metric`;

    setIsLoading(true);

    const response = await fetch(url);
    const data = await response.json();
    setWeather(data);

    setIsLoading(false);
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    });
  };

  const getWeatherByCity = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPEN_WEATHER_API_KEY}&units=metric`;

    setIsLoading(true);

    const response = await fetch(url);
    const data = await response.json();
    setWeather(data);

    setIsLoading(false);
  };

  const handleSearchLocation = (e) => {
    e.preventDefault();

    if (!searchInputRef.current.value) {
      alert('Enter the location you want to search.');
    } else {
      setCity(searchInputRef.current.value);
    }

    searchInputRef.current.value = '';
  };

  useEffect(() => {
    if (!city) {
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }
  }, [city]);

  return (
    <div className='container'>
      {isLoading ? (
        <div className='loading-spinner'></div>
      ) : (
        <>
          <div className='location'>
            <div className='location__info'>
              <FontAwesomeIcon icon={faLocationDot} />
              <p className='location__name'>{weather?.name}</p>
            </div>
            <form className='location__search' onSubmit={handleSearchLocation}>
              <button className='location__search-button' type='submit'>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
              <input className='location__search-input' type='text' placeholder='Search...' ref={searchInputRef} />
            </form>
          </div>
          <div className='weather-section'>
            <Weather weather={weather} />
            <City cities={cities} city={city} setCity={setCity} />
          </div>
        </>
      )}
    </div>
  );
};

export default App;
