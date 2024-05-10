import React from 'react';

const NotFound = () => {
  return (
    <section className="not-found-page d-flex justify-content-center align-items-center">
      <div className="container">
        <img src="/404-logo.png" alt="" />
        <p className="ops">Ooops!</p>
        <p className="wrong">Something went wrong</p>
        <p>The page you are looking for does not exist</p>
        <a href="/" className="button-62" role="button">
          Home
        </a>
      </div>
    </section>
  );
};

export default NotFound;
