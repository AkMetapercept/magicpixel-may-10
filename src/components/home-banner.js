import React from 'react';

const HomeBanner = () => {
  return (
    <div className="landing-container ">
      <div className="container">
        <h1 style={{ color: 'white' }}>Magic Pixel</h1>
        <h4 style={{ color: 'white' }}>
          Everything you need to get your software documentation online.
        </h4>
        <form className="form-group pt-3">
          <div style={{ position: 'relative' }}>
            <input type="text" className="search-bar" placeholder="Search..." />
            <button className="searchicon">
              <i className="fa-solid fa-magnifying-glass" style={{ color: '#1B0C8A' }}></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HomeBanner;
