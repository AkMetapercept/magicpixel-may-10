import * as React from 'react';
import OpenedSvg from '../images/opened';
import ClosedSvg from '../images/closed';
import config from '../../../config';
import Link from '../link';
import { useSidebarContext } from '../../context/sidebarContext';

const imageData = {
  Introduction: '/landing-page/icons/blue/introduction.png',
  'Navigating Through UI': '/landing-page/icons/blue/navigation-ui.png',
  Dashboard: '/landing-page/icons/blue/dashboard.png',
  Reports: '/landing-page/icons/blue/report.png',
  'Add a New Project': '/landing-page/icons/blue/new-project.png',
  Tags: '/landing-page/icons/blue/tags.png',
  'Data Elements': '/landing-page/icons/blue/data-element.png',
  Providers: '/landing-page/icons/blue/provider.png',
  Triggers: '/landing-page/icons/blue/trigger.png',
  'Qualification Criteria': '/landing-page/icons/blue/qualification.png',
  Transformers: '/landing-page/icons/blue/transformers.png',
  Publish: '/landing-page/icons/blue/publish.png',
  'Live Debugging': '/landing-page/icons/blue/debugging.png',
  'Data Governance': '/landing-page/icons/blue/governance.png',
  Settings: '/landing-page/icons/blue/settings.png',
  Environments: '/landing-page/icons/blue/states.png',
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
    location && (location.pathname === url || location.pathname === url + config.gatsby.pathPrefix);

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
