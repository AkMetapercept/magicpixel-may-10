import * as React from 'react';
import styled from '@emotion/styled';
import { MDXProvider } from '@mdx-js/react';
import ThemeProvider from './theme/themeProvider';
import mdxComponents from './mdxComponents';
import Sidebar from './sidebar';
import RightSidebar from './rightSidebar';
import { SidebarContextProvide } from '../context/sidebarContext.jsx';
import './css/global.css';
import Breadcrumb from './custom/breadcrumb/breadcrumb.jsx';

const Content = styled('main')`
  display: flex;
  flex-grow: 1;
  background: ${({ theme }) => theme.colors.background};

  table tr {
    background: ${({ theme }) => theme.colors.background};
  }

  @media only screen and (max-width: 1023px) {
    padding-left: 0;
    margin: 0 10px;
  }
`;

const MaxWidth = styled('div')`
  @media only screen and (max-width: 50rem) {
    width: 100%;
    position: relative;
  }
`;

const Layout = ({ children, location, edges }) => {
  const [displayBanner, setDisplayBanner] = React.useState(false);

  React.useEffect(() => {
    setDisplayBanner(() => (location.pathname === '/' ? true : false));
  }, [location.pathname]);

  return (
    <SidebarContextProvide edges={edges}>
      <ThemeProvider location={location}>
        {displayBanner && (
          <div
            className="landingContainer"
            style={{
              position: 'relative',
              width: '100%',
              height: '300px',
              backgroundImage: 'url("/landing-page/banner.jpg")',
              backgroundSize: 'cover',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              marginBottom: '20px',
              paddingTop: '50px',
            }}
          >
            <div>
              <h1>Magic Pixel</h1>
              <input
                type="text"
                className="search-bar"
                placeholder="Search..."
                style={{
                  marginTop: '20px',
                  padding: '10px',
                  width: '300px',
                  border: 'none',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  color: '#333',
                  fontSize: '16px',
                }}
              />
            </div>
          </div>
        )}

        <MDXProvider components={mdxComponents}>
          <section className="container-fluid">
            <div className="row">
              {/* {!displayBanner && ( */}
              <div className="sidebar-container">
                <Sidebar location={location} />
              </div>
              {/* )} */}
              <div className="col">
                <Content>
                  <MaxWidth>
                    {!displayBanner && <Breadcrumb location={location} key={location.pathname} />}
                    {children}
                  </MaxWidth>
                </Content>
              </div>
              {!displayBanner && (
                <div className="d-none d-lg-block" style={{ width: '300px' }}>
                  <RightSidebar location={location} />
                </div>
              )}
            </div>
          </section>
        </MDXProvider>
      </ThemeProvider>
    </SidebarContextProvide>
  );
};

export default Layout;
