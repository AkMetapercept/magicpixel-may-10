import { createContext, useContext, useState } from 'react';

export const SidebarContext = createContext({
  collapsed: {},
  setCollapsed: () => {},
  toggle: () => {},
  traversePrevNext: () => {},
  urlObject: [],
  setUrlObject: () => {},
});

export const useSidebarContext = () => useContext(SidebarContext);

// Check if window is defined (so if in the browser or in node.js).
const isBrowser = typeof window !== 'undefined';

export const SidebarContextProvide = ({ children, edges }) => {
  const setDefaultCollapsed = () => {
    const defaultCollapsed = {};
    edges.map(({ node: { fields } }) => {
      // console.log(fields);
      if (isBrowser) {
        if (window.location.pathname.startsWith(fields.slug)) {
          defaultCollapsed[fields.slug] = false;
        } else {
          defaultCollapsed[fields.slug] = true;
        }
      } else {
        defaultCollapsed[fields.slug] = true;
      }
    });
    return defaultCollapsed;
  };

  const [collapsed, setCollapsed] = useState(setDefaultCollapsed);
  const [urlObject, setUrlObject] = useState([]);

  const toggle = (url) => {
    setCollapsed((prev) => {
      let newData = {};
      Object.keys(prev).map((link) => {
        if (url?.startsWith(link)) {
          if (url == link && !prev[link]) {
            newData[link] = true;
          } else {
            newData[link] = false;
          }
        } else {
          newData[link] = true;
        }
      });
      return newData;
    });
  };
  const traversePrevNext = (url) => {
    setCollapsed((prev) => {
      let newData = {};
      Object.keys(prev).map((link) => {
        if (url?.startsWith(link)) {
          newData[link] = false;
        } else {
          newData[link] = true;
        }
      });
      return newData;
    });
  };

  return (
    <SidebarContext.Provider
      value={{ collapsed, setCollapsed, toggle, traversePrevNext, urlObject, setUrlObject }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
