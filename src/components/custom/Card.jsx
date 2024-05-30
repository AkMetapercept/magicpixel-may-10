import { Link } from 'gatsby';
import React from 'react';
import { useSidebarContext } from '../../context/sidebarContext';
import HomeBanner from '../home-banner';

const imageData = {
  aboutmagicpixel: '/landing-page/icons/blue/introduction.png',
  navigatingthroughui: '/landing-page/icons/blue/navigation-ui.png',
  dashboard: '/landing-page/icons/blue/dashboard.png',
  reports: '/landing-page/icons/blue/report.png',
  addanewproject: '/landing-page/icons/blue/new-project.png',
  tags: '/landing-page/icons/blue/tags.png',
  dataelements: '/landing-page/icons/blue/data-element.png',
  providers: '/landing-page/icons/blue/provider.png',
  triggers: '/landing-page/icons/blue/trigger.png',
  qualificationcriteria: '/landing-page/icons/blue/qualification.png',
  transformers: '/landing-page/icons/blue/transformers.png',
  publish: '/landing-page/icons/blue/publish.png',
  livedebugging: '/landing-page/icons/blue/debugging.png',
  datagovernance: '/landing-page/icons/blue/governance.png',
  settings: '/landing-page/icons/blue/settings.png',
  environments: '/landing-page/icons/blue/states.png',
  alarms: '/landing-page/icons/blue/alarm.png',
};

const MdxCard = ({ data }) => {
  console.log('🚀 ~ file: Card.jsx:20 ~ MdxCard ~ data:', data);
  return (
    <Link to={data.url}>
      <div className="card">
        <div className="card-body">
          <div className="d-flex gap-4 align-items-center">
            <div className="imgWrapper">
              <img
                className="imgicon"
                alt={data.label}
                src={imageData[data.label]}
                width={30}
                height={30}
              />
            </div>
            <h4 className="card-title"> {data.title}</h4>
          </div>
        </div>
      </div>
    </Link>
  );
  // <div className="card">
  //   <div className="card-body">
  //     <div className="d-flex gap-4 align-items-center">
  //       <img alt={data.label} src={imageData[data.label]} width={40} />
  //       <Link to={data.url}>
  //         {' '}
  //         <h5 className="card-title"> {data.title}</h5>
  //       </Link>
  //     </div>
  //   </div>
  // </div>
};

export function CardComp() {
  const { urlObject } = useSidebarContext();

  return (
    <>
      <div className="row">
        {urlObject?.items?.map((item, i) => (
          <div key={i} className="col-md-6 col-lg-4 mb-5 ">
            <MdxCard data={item} />
          </div>
        ))}
      </div>
    </>
  );
}
