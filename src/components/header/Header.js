import * as React from 'react';
import Link from '../link.js';
import Sidebar from '../sidebar/index.js';

// ----------logo-----------------
import logoImg from '../images/magicPixel.png';
// import ThemeToggle from './theme-toggle.js';
import SearchModal from './search-modal.js';

const toggleSidebar = () => {
  let sidebar = document.querySelector('.sidebar-container');
  const computedStyle = window.getComputedStyle(sidebar);
  const leftValue = computedStyle.getPropertyValue('left');
  if (leftValue === '0px') {
    sidebar.style.left = '-320px';
  } else {
    sidebar.style.left = '0px';
  }
};

const Header = ({ location }) => {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <>
      <header>
        <nav className="container-fluid">
          <div className="d-flex justify-content-between align-items-center">
            <div className={'navBarHeader'}>
              <i className="fa-solid fa-bars  d-block d-xl-none" onClick={toggleSidebar}></i>
              <Link to={'/'} className={'navBarBrand'}>
                <img
                  className={'img-responsive displayInline'}
                  src="/company-logo.png"
                  alt={'magic pixel'}
                />
              </Link>
            </div>
            <div className="d-flex gap-5 align-items-center">
              <div className="top-search-box d-none d-sm-flex">
                <form className="search-form" onClick={() => setShowModal(true)}>
                  <input
                    type="text"
                    placeholder="Search the docs..."
                    name="search"
                    className="form-control search-input"
                    autoComplete="off"
                    readOnly
                  />
                  <button type="submit" className="btn search-btn" value="Search">
                    <i className="fas fa-search" />
                  </button>
                </form>
              </div>
              <div className="top-search-box-mobile d-flex d-sm-none">
                <form className="search-form" onClick={() => setShowModal(true)}>
                  <input
                    type="text"
                    name="search"
                    className="form-control search-input"
                    autoComplete="off"
                    readOnly
                  />
                  <button
                    type="submit"
                    className="btn search-btn"
                    value="Search"
                    aria-label="Search"
                  >
                    <i className="fas fa-search" />
                  </button>
                </form>
              </div>

              <div className="social-icons d-none d-lg-flex gap-3 justify-content-center">
                <a
                  href="https://twitter.com/1MagicPixel"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="twitter"
                >
                  <i className="fa-brands fa-x-twitter"></i>
                </a>

                <a
                  href="https://www.facebook.com/1magicpixel"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="facebook"
                >
                  <i className="fa-brands fa-facebook-f"></i>
                </a>

                <a
                  href="https://www.linkedin.com/company/magicpixel/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="linkedin"
                >
                  <i className="fa-brands fa-linkedin-in"></i>
                </a>

                <a
                  href="https://www.youtube.com/channel/UCA08lnOE0hrLgT8PP0zB0_w"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="youtube"
                >
                  <i className="fa-brands fa-youtube"></i>
                </a>
              </div>
              {/* <ThemeToggle /> */}
            </div>
          </div>
        </nav>

        {/* ========for mobile view========= */}
        <div id="navbar" className={'topnav'}>
          <div className={'visibleMobile'}>
            <Sidebar location={location} />
            <hr />
          </div>
        </div>

        {/* ==========search model============= */}
        <SearchModal showModal={showModal} setShowModal={setShowModal} />
      </header>
      <div className="fill-header-hight"></div>
    </>
  );
};

export default Header;
