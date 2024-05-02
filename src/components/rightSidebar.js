import * as React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import config from '../../config';

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
      let currentData = null;
      const generateListItems = (items) => {
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

      if (allMdx.edges !== undefined && allMdx.edges.length > 0) {
        allMdx.edges.map((item, index) => {
          if (item !== undefined) {
            if (
              item.node.fields.slug === location.pathname ||
              config.gatsby.pathPrefix + item.node.fields.slug === location.pathname
            ) {
              currentData = item.node.tableOfContents.items;
            }
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

export default SidebarLayout;
