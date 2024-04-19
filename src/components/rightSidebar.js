import * as React from 'react';
import { StaticQuery, graphql } from 'gatsby';

// import Link from './link';
import config from '../../config';
import { Sidebar, ListItem } from './styles/Sidebar';

const SidebarLayout = ({ location }) => (
  <StaticQuery
    query={graphql`
      query {
        allMdx {
          edges {
            node {
              fields {
                slug
              }
              tableOfContents
            }
          }
        }
      }
    `}
    render={({ allMdx }) => {
      let navItems = [];
      let currentData = null;
      const generateListItems = (items) => {
        // console.log('🚀 ~ file: rightSidebar.js:59 ~ generateListItems ~ items:', items);
        return (
          <ul>
            {items?.map((item, index) => (
              <li key={index}>
                <a href={`#${item.title.replace(/ /g, '').toLowerCase()}`}>{item.title}</a>
                {item.items && generateListItems(item.items)}{' '}
                {/* Recursively call if there are sub-items */}
              </li>
            ))}
          </ul>
        );
      };

      let finalNavItems;

      if (allMdx.edges !== undefined && allMdx.edges.length > 0) {
        // const navItems = allMdx.edges.map((item, index) => {
        //   let innerItems;

        //   if (item !== undefined) {
        //     if (
        //       item.node.fields.slug === location.pathname ||
        //       config.gatsby.pathPrefix + item.node.fields.slug === location.pathname
        //     ) {
        //       if (item.node.tableOfContents.items) {
        //         innerItems = item.node.tableOfContents.items.map((innerItem, index) => {
        //           const itemId = innerItem.title
        //             ? innerItem.title.replace(/\s+/g, '').toLowerCase()
        //             : '#';

        //           return (
        //             <ListItem key={index} to={`#${itemId}`} level={1}>
        //               {innerItem.title}
        //             </ListItem>
        //           );
        //         });
        //       }
        //     }
        //   }
        //   if (innerItems) {
        //     finalNavItems = innerItems;
        //   }
        // });

        const navItems = allMdx.edges.map((item, index) => {
          let innerItems;

          if (item !== undefined) {
            if (
              item.node.fields.slug === location.pathname ||
              config.gatsby.pathPrefix + item.node.fields.slug === location.pathname
            ) {
              {
                currentData = item.node.tableOfContents.items;
                // const obj = generateListItems(item.node.tableOfContents.items);
                // console.log('🚀 ~ file: rightSidebar.js:82 ~ navItems ~ obj:', obj);
              }
              // if (item.node.tableOfContents.items) {
              //   innerItems = item.node.tableOfContents.items.map((innerItem, index) => {
              //     const itemId = innerItem.title
              //       ? innerItem.title.replace(/\s+/g, '').toLowerCase()
              //       : '#';

              //       {generateListItems(items)}

              //     return (
              //       <ListItem key={index} to={`#${itemId}`} level={1}>
              //         {innerItem.title}
              //         {
              //           if(items.items){

              //           }
              //         }
              //       </ListItem>
              //     );
              //   });
              // }
            }
          }
          if (innerItems) {
            finalNavItems = innerItems;
          }
        });
      }

      if (finalNavItems && finalNavItems.length) {
        return (
          <>
            {currentData && (
              <Sidebar>
                <h6 className={'rightSideTitle '}>CONTENTS</h6>
                <ul className={'rightSideBarUL'}>
                  {/* {finalNavItems} */}
                  {generateListItems(currentData)}
                </ul>
              </Sidebar>
            )}
          </>
        );
      } else {
        return (
          <>
            {currentData && (
              <Sidebar>
                <h6 className={'rightSideTitle '}>CONTENTS</h6>
                <ul className={'rightSideBarUL'}>
                  {/* {finalNavItems} */}
                  {generateListItems(currentData)}
                </ul>
              </Sidebar>
            )}
          </>
        );
      }
    }}
  />
);

export default SidebarLayout;
