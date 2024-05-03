import React from 'react';

const Seo = ({ title }) => {
  return (
    <>
      {title ? <title>{title}</title> : null}
      {title ? <meta name="title" content={title} /> : null}
    </>
  );
};

export default Seo;
