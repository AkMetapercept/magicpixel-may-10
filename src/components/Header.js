import * as React from 'react';
import styled from '@emotion/styled';
import { StaticQuery, graphql } from 'gatsby';
import GitHubButton from 'react-github-btn';
import Link from './link';
import Loadable from 'react-loadable';

import config, { header } from '../../config.js';
import LoadingProvider from './mdxComponents/loading';
import { DarkModeSwitch } from './DarkModeSwitch';

// ----------logo-----------------
import logoImg from './images/magicPixel.png';

const help = require('./images/help.svg');

const isSearchEnabled = config.header.search && config.header.search.enabled ? true : false;

let searchIndices = [];

if (isSearchEnabled && config.header.search.indexName) {
  searchIndices.push({
    name: `${config.header.search.indexName}`,
    title: `Results`,
    hitComp: `PageHit`,
  });
}

import Sidebar from './sidebar';
import Search from './custom/search/search.jsx';

const LoadableComponent = Loadable({
  loader: () => import('./search/index'),
  loading: LoadingProvider,
});

function myFunction() {
  var x = document.getElementById('navbar');

  if (x.className === 'topnav') {
    x.className += ' responsive';
  } else {
    x.className = 'topnav';
  }
}
const toggleSidebar = () => {
  let sidebar = document.querySelector('.sidebar-container');
  const computedStyle = window.getComputedStyle(sidebar);
  const leftValue = computedStyle.getPropertyValue('left');
  // console.log('🚀 ~ file: Header.js:49 ~ toggleSidebar ~ computedStyle:', leftValue);
  if (leftValue == '0px') {
    sidebar.style.left = '-320px';
  } else {
    sidebar.style.left = '0px';
  }
};

const StyledBgDiv = styled('div')`
  height: 60px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  background-color: #f8f8f8;
  position: relative;
  display: none;
  background: ${(props) => (props.isDarkThemeActive ? '#001932' : undefined)};

  @media (max-width: 767px) {
    display: block;
  }
`;

const Header = ({ location, isDarkThemeActive, toggleActiveTheme }) => (
  <StaticQuery
    query={graphql`
      query headerTitleQuery {
        site {
          siteMetadata {
            headerTitle
            githubUrl
            helpUrl
            tweetText
            logo {
              link
              image
            }
            headerLinks {
              link
              text
            }
          }
        }
      }
    `}
    render={(data) => {
      // const logoImg = require('./images/logo.svg');

      const {
        site: {
          siteMetadata: { headerTitle, githubUrl, helpUrl, tweetText, logo, headerLinks },
        },
      } = data;

      const finalLogoLink = logo.link !== '' ? logo.link : 'https://hasura.io/';

      return (
        <>
          <header>
            {/* <div className={'navBarWrapper'}> */}
            <nav className="container-fluid">
              <div className="d-flex justify-content-between align-items-center">
                <div className={'navBarHeader'}>
                  <i
                    className="fa-solid fa-bars me-3 d-block d-xl-none"
                    onClick={toggleSidebar}
                  ></i>
                  <Link to={'/'} className={'navBarBrand'}>
                    <img
                      className={'img-responsive displayInline'}
                      // src={logo.image !== '' ? logo.image : logoImg}
                      src={logoImg}
                      alt={'logo'}
                    />
                  </Link>
                </div>
                <Search />
              </div>
            </nav>
            <div id="navbar" className={'topnav'}>
              <div className={'visibleMobile'}>
                <Sidebar location={location} />
                <hr />
              </div>
            </div>
            {/* <StyledBgDiv isDarkThemeActive={isDarkThemeActive}>
              <div className={'navBarDefault removePadd'}>
                <span
                  onClick={myFunction}
                  className={'navBarToggle'}
                  onKeyDown={myFunction}
                  role="button"
                  tabIndex={0}
                >
                  <span className={'iconBar'}></span>
                  <span className={'iconBar'}></span>
                  <span className={'iconBar'}></span>
                </span>
              </div>
              {isSearchEnabled ? (
              <div className={'searchWrapper'}>
                <LoadableComponent collapse={true} indices={searchIndices} />
              </div>
            ) : null}
            </StyledBgDiv> */}
            {/* </div> */}
          </header>
          <div className="fill-header-hight"></div>
        </>
      );
    }}
  />
);

export default Header;
