const City = ({ cities, city, setCity }) => {
  return (
    <div className='city'>
      <button
        className={`city__button ${city === '' ? 'city__button--active' : ''}`}
        type='button'
        onClick={() => setCity('')}
      >
        Current Location
      </button>
      {cities.map((item) => (
        <button
          className={`city__button ${city === item ? 'city__button--active' : ''}`}
          key={item}
          type='button'
          onClick={() => setCity(item)}
        >
          {item.toLowerCase().replace(/\b[a-z]/g, (c) => c.toUpperCase())}
        </button>
      ))}
    </div>
  );
};

export default City;
