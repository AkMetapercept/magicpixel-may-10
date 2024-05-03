import * as React from 'react';
import { MDXProvider } from '@mdx-js/react';
import mdxComponents from './mdxComponents';
import Sidebar from './sidebar';
import { SidebarContextProvide } from '../context/sidebarContext.jsx';
import Header from './header/Header.js';
import HomeBanner from './home-banner.js';
import Seo from './seo.js';

const LayoutHome = ({ children, location, edges, metaTitle }) => {
  const sidebarRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        let sidebar = sidebarRef.current;
        const computedStyle = window.getComputedStyle(sidebar);
        const leftValue = computedStyle.getPropertyValue('left');
        const position = computedStyle.getPropertyValue('position');
        if (leftValue === '0px' && position === 'fixed') {
          sidebar.style.left = '-320px';
        }
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <SidebarContextProvide edges={edges}>
      <Seo title={metaTitle} />

      <Header location={location} />
      <HomeBanner />
      {/* <div className="landing-container">
          <div>
            <h1>Magic Pixel</h1>
            <input type="text" className="search-bar" placeholder="Search..." />
          </div>
        </div> */}

      <MDXProvider components={mdxComponents}>
        <section className="container-fluid">
          <div className="row">
            <div className="sidebar-container" ref={sidebarRef}>
              <Sidebar location={location} />
            </div>

            <div className="col pt-4">
              <main>{children}</main>
              {/* <Footer /> */}
            </div>
          </div>
        </section>
      </MDXProvider>
    </SidebarContextProvide>
  );
};

export default LayoutHome;
