import * as React from 'react';
import { MDXProvider } from '@mdx-js/react';
import mdxComponents from './mdxComponents';
import Sidebar from './sidebar';
import RightSidebar from './rightSidebar';
import { SidebarContextProvide } from '../context/sidebarContext.jsx';
import Breadcrumb from './custom/breadcrumb.jsx';
import Header from './header/Header.js';
import HomeBanner from './home-banner.js';
import Footer from './footer/footer.js';

const Layout = ({ children, location, edges }) => {
  const [displayBanner, setDisplayBanner] = React.useState(false);

  // Check if window is defined (so if in the browser or in node.js).
  const isBrowser = typeof window !== 'undefined';
  React.useEffect(() => {
    if (isBrowser) {
      setDisplayBanner(() => (window?.location?.pathname === '/' ? true : false));
    }
  });

  return (
    <SidebarContextProvide edges={edges}>
      <Header location={location} />
      {displayBanner && <HomeBanner />}
      {/* <div className="landing-container">
          <div>
            <h1>Magic Pixel</h1>
            <input type="text" className="search-bar" placeholder="Search..." />
          </div>
        </div> */}

      <MDXProvider components={mdxComponents}>
        <section className="container-fluid">
          <div className="row">
            <div className="sidebar-container">
              <Sidebar location={location} />
            </div>

            <div className="col">
              <main>
                {!displayBanner && <Breadcrumb location={location} key={location.pathname} />}
                {children}
              </main>
              <Footer />
            </div>
            {!displayBanner && (
              <div className="d-none d-lg-block" style={{ width: '300px' }}>
                <RightSidebar location={location} />
              </div>
            )}
          </div>
        </section>
      </MDXProvider>
    </SidebarContextProvide>
  );
};

export default Layout;
