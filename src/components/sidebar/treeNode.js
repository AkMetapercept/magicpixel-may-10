import * as React from 'react';
import OpenedSvg from '../images/opened';
import ClosedSvg from '../images/closed';
import config from '../../../config';
import Link from '../link';
import { useSidebarContext } from '../../context/sidebarContext';
// import { Router, useNavigate } from 'react-router-dom';

const TreeNode = ({ className = '', url, title, items, ...rest }) => {
  // const router = useNavigate();
  const { collapsed, toggle, traversePrevNext } = useSidebarContext();
  const isCollapsed = collapsed[url];

  const collapse = () => {
    // setCollapsed(url);
    // console.log('object');
    toggle(url);
  };

  const hasChildren = items.length !== 0;

  let location;

  if (typeof window !== 'undefined') {
    location = window.location;
  }
  // if (typeof document != 'undefined') {
  //   location = document.location;
  // }
  const active =
    location && (location.pathname === url || location.pathname === config.gatsby.pathPrefix + url);

  const calculatedClassName = `${className} item ${active ? 'active' : ''}`;

  React.useEffect(() => {
    toggle(location?.pathname);
  }, [location?.pathname]);

  return (
    <li className={calculatedClassName}>
      {title && (
        <Link to={url} onClick={collapse}>
          {/* <Link to={url}> */}
          {title}
          {!config.sidebar.frontLine && title && hasChildren ? (
            <button aria-label="collapse" className="collapser">
              {!isCollapsed ? <OpenedSvg /> : <ClosedSvg />}
            </button>
          ) : null}
        </Link>
      )}
      {!isCollapsed && hasChildren ? (
        <ul>
          {items.map((item, index) => (
            <TreeNode
              key={item.url + index.toString()}
              // setCollapsed={setCollapsed}
              // collapsed={collapsed}
              {...item}
            />
          ))}
        </ul>
      ) : null}
    </li>
  );
};

export default TreeNode;
