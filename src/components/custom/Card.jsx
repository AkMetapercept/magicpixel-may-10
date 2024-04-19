import { Link } from 'gatsby';
import React from 'react';
import { useSidebarContext } from '../../context/sidebarContext';

const MdxCard = ({ data }) => {
  console.log('🚀 ~ file: Card.jsx:6 ~ MdxCard ~ data:', data);
  return (
    <div className="card">
      <div className="card-body">
        <Link to={data.url}>
          {' '}
          <h5 className="card-title"> {data.title}</h5>
        </Link>
        <p className="card-text">
          With supporting text below as a natural lead-in to additional content.
        </p>
      </div>
    </div>
  );
};

export function CardComp() {
  const { urlObject } = useSidebarContext();

  return (
    <>
      <div className="row">
        {urlObject?.items?.map((item, i) => (
          <div key={i} className="col-md-6 col-lg-6 mb-4 ">
            <MdxCard data={item} />
          </div>
        ))}
      </div>
    </>
  );
}
