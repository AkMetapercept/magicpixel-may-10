// import * as React from 'react';
// import { StaticQuery, graphql } from 'gatsby';
// import config from '../../config';

// const SidebarLayout = ({ location }) => (
//   <StaticQuery
//     query={graphql`
//       query {
//         allMdx {
//           edges {
//             node {
//               fields {
//                 slug
//               }
//               tableOfContents(maxDepth: 3)
//             }
//           }
//         }
//       }
//     `}
//     render={({ allMdx }) => {
//       let currentData = null;
//       const generateListItems = (items) => {
//         return (
//           <ul>
//             {items?.map((item, index) => {
//               const url = `#${item.title.replace(/ /g, '').toLowerCase()}`;
//               return (
//                 <li key={index}>
//                   <a href={url} className={`${url === location?.hash ? 'active' : ''} `}>
//                     {item.title}
//                   </a>
//                   {item.items && generateListItems(item.items)}{' '}
//                   {/* Recursively call if there are sub-items */}
//                 </li>
//               );
//             })}
//           </ul>
//         );
//       };

//       if (allMdx.edges !== undefined && allMdx.edges.length > 0) {
//         allMdx.edges.forEach((item, index) => {
//           if (item !== undefined) {
//             if (
//               item.node.fields.slug === location.pathname ||
//               config.gatsby.pathPrefix + item.node.fields.slug === location.pathname ||
//               item.node.fields.slug + config.gatsby.pathPrefix === location.pathname
//             ) {
//               currentData = item.node.tableOfContents.items;
//             }
//           }
//         });
//       }

//       return (
//         <>
//           {currentData && (
//             <div className="right-side-toc">
//               <h6 className={'rightSideTitle '}>CONTENTS</h6>
//               <ul className={'rightSideBarUL'}>{generateListItems(currentData)}</ul>
//             </div>
//           )}
//         </>
//       );
//     }}
//   />
// );

// export default SidebarLayout;

/////////////////////////////////////////////////////////////////////////////New Code ////////////////////////////////////////////////////////////////////////////



import * as React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import config from '../../config';

const SidebarLayout = ({ location }) => {
  const [activeId, setActiveId] = React.useState('');

  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
          localStorage.setItem('activeId', entry.target.id);
        }
      });
    }, {
      rootMargin: '0px',
      threshold: 0.5
    });

    const headings = document.querySelectorAll('h1, h2, h3');
    headings.forEach((heading) => {
      observer.observe(heading);
    });

    const storedActiveId = localStorage.getItem('activeId');
    if (storedActiveId) {
      setActiveId(storedActiveId);
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      headings.forEach((heading) => observer.unobserve(heading));
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  const handleScroll = () => {

    const headings = document.querySelectorAll('h1, h2, h3');
  
    headings.forEach((heading) => {
      const rect = heading.getBoundingClientRect();
      const topRelativeToViewport = rect.top;
  
      // Check if the top of the heading is within 300px from the top of the viewport
      // const halfScreenHeight = window.innerHeight / 2;
      if (topRelativeToViewport < 200) {
        setActiveId(heading.id);
        localStorage.setItem('activeId', heading.id);
      }
    });
  };
  

  const generateListItems = (items) => {
    return (
      <ul>
        {items?.map((item, index) => {
          const id = item.title.replace(/ /g, '').toLowerCase();
          return (
            <li key={index} className={id === activeId ? 'active' : ''}>
              <a href={`#${id}`} className={id === activeId ? 'active' : ''}>
                {item.title}
              </a>
              {item.items && generateListItems(item.items)}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <StaticQuery
      query={graphql`
        query {
          allMdx {
            edges {
              node {
                fields {
                  slug
                }
                tableOfContents(maxDepth: 3)
              }
            }
          }
        }
      `}
      render={({ allMdx }) => {
        let currentData = null;

        if (allMdx.edges !== undefined && allMdx.edges.length > 0) {
          allMdx.edges.forEach((item) => {
            if (
              item !== undefined &&
              (item.node.fields.slug === location.pathname ||
                config.gatsby.pathPrefix + item.node.fields.slug === location.pathname ||
                item.node.fields.slug + config.gatsby.pathPrefix === location.pathname)
            ) {
              currentData = item.node.tableOfContents.items;
            }
          });
        }

        return (
          <>
            {currentData && (
              <div className="right-side-toc">
                <h6 className={'rightSideTitle '}>CONTENTS</h6>
                <ul className={'rightSideBarUL'}>{generateListItems(currentData)}</ul>
              </div>
            )}
          </>
        );
      }}
    />
  );
};

export default SidebarLayout;
