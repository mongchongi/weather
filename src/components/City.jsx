const City = () => {
  return (
    <div className='city'>
      <button className='city__button city__button--active' type='button'>
        Current Location
      </button>
      <button className='city__button' type='button'>
        Paris
      </button>
      <button className='city__button' type='button'>
        New York
      </button>
    </div>
  );
};

export default City;
