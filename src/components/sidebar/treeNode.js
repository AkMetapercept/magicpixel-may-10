import * as React from 'react';
import OpenedSvg from '../images/opened';
import ClosedSvg from '../images/closed';
import config from '../../../config';
import Link from '../link';
import { useSidebarContext } from '../../context/sidebarContext';

const imageData = {
  Introduction: '/landing-page/icons/introduction.png',
  'Navigating Through UI': '/landing-page/icons/navigation-ui.png',
  Dashboard: '/landing-page/icons/dashboard.png',
  Reports: '/landing-page/icons/report.png',
  'Add a New Project': '/landing-page/icons/new-project.png',
  Tags: '/landing-page/icons/tags.png',
  'Data Elements': '/landing-page/icons/data-element.png',
  Providers: '/landing-page/icons/provider.png',
  Triggers: '/landing-page/icons/trigger.png',
  'Qualification Criteria': '/landing-page/icons/qualification.png',
  Transformers: '/landing-page/icons/transformers.png',
  Publish: '/landing-page/icons/publish.png',
  'Live Debugging': '/landing-page/icons/debugging.png',
};
const getImageForTitle = (title) => {
  // Check if the title exists in imageData
  if (title in imageData) {
    return imageData[title]; // Return the corresponding image path
  } else {
    return null;
  }
};

const TreeNode = ({ className = '', url, title, items, ...rest }) => {
  const { collapsed, toggle } = useSidebarContext();
  const isCollapsed = collapsed[url];

  const collapse = () => {
    toggle(url);
  };

  const hasChildren = items.length !== 0;

  let location;

  if (typeof window !== 'undefined') {
    location = window.location;
  }

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
          {getImageForTitle(title) && (
            <div className="circular-container">
              <img src={getImageForTitle(title)} alt={title} />
            </div>
          )}
          {title}
          {title && hasChildren ? (
            <button aria-label="collapse" className="collapser">
              {!isCollapsed ? <OpenedSvg /> : <ClosedSvg />}
            </button>
          ) : null}
        </Link>
      )}
      {!isCollapsed && hasChildren ? (
        <ul>
          {items.map((item, index) => (
            <TreeNode key={item.url + index.toString()} {...item} />
          ))}
        </ul>
      ) : null}
    </li>
  );
};

export default TreeNode;
