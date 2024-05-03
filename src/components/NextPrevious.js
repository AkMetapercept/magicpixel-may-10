import * as React from 'react';
import Link from './link';

import config from '../../config';
import { useSidebarContext } from '../context/sidebarContext';

const NextPrevious = ({ mdx, allMdx }) => {
  const { traversePrevNext } = useSidebarContext();
  let nav = [];
  const calculateTreeData = (edges) => {
    //  (landing page to be add or not)
    const originalData = config.sidebar.ignoreIndex
      ? edges.filter(
          ({
            node: {
              fields: { slug },
            },
          }) => slug !== '/'
        )
      : edges;

    originalData.reduce(
      (
        accu,
        {
          node: {
            fields: { slug, title },
            frontmatter: { order },
          },
        }
      ) => {
        const parts = slug.split('/');

        let { items: prevItems } = accu;

        const slicedParts =
          config.gatsby && config.gatsby.trailingSlash ? parts.slice(1, -2) : parts.slice(1, -1);

        for (const part of slicedParts) {
          let tmp = prevItems && prevItems.find(({ label }) => label === part);

          if (tmp) {
            if (!tmp.items) {
              tmp.items = [];
            }
          } else {
            tmp = { label: part, items: [] };
            prevItems.push(tmp);
          }
          prevItems = tmp.items;
        }
        const slicedLength =
          config.gatsby && config.gatsby.trailingSlash ? parts.length - 2 : parts.length - 1;

        const existingItem = prevItems.find(({ label }) => label === parts[slicedLength]);

        if (existingItem) {
          existingItem.url = slug;
          existingItem.title = title;
        } else {
          prevItems.push({
            label: parts[slicedLength],
            url: slug,
            items: [],
            title,
            order,
          });
        }
        // =================================custom code=================================================
        function sortNestedArrayByKey(arr) {
          // Sort the array of objects based on the specified key
          arr.items.sort((a, b) => a.order - b.order);

          arr.items.forEach((obj) => {
            if (obj.items) {
              sortNestedArrayByKey(obj);
            }
          });
        }
        sortNestedArrayByKey(accu);
        // Function to flatten a nested array of objects
        function flatten(arr) {
          return arr.reduce((acc, curr) => {
            // Push the current object into the accumulator array
            acc.push(curr);
            // If the current object has a 'children' property which is an array, recursively flatten it
            if (curr.items) {
              acc.push(...flatten(curr.items));
            }
            return acc;
          }, []);
        }
        // Flatten the sorted array
        const flatArray = flatten(accu.items);
        nav = flatArray;
        // ==================================================================================

        return accu;
      },
      { items: [] }
    );
  };

  calculateTreeData(allMdx.edges);

  let currentIndex;

  nav.forEach((el, index) => {
    if (el && el.url === mdx.fields.slug) {
      currentIndex = index;
    }
  });
  // currentPaginationInfo();

  const nextInfo = {};

  const previousInfo = {};

  if (currentIndex === undefined) {
    // index
    if (nav[0]) {
      nextInfo.url = nav[0].url;
      nextInfo.title = nav[0].title;
    }
    previousInfo.url = null;
    previousInfo.title = null;
    currentIndex = -1;
  } else if (currentIndex === 0) {
    // first page
    nextInfo.url = nav[currentIndex + 1] ? nav[currentIndex + 1].url : null;
    nextInfo.title = nav[currentIndex + 1] ? nav[currentIndex + 1].title : null;
    previousInfo.url = null;
    previousInfo.title = null;
  } else if (currentIndex === nav.length - 1) {
    // last page
    nextInfo.url = null;
    nextInfo.title = null;
    previousInfo.url = nav[currentIndex - 1] ? nav[currentIndex - 1].url : null;
    previousInfo.title = nav[currentIndex - 1] ? nav[currentIndex - 1].title : null;
  } else if (currentIndex) {
    // any other page
    nextInfo.url = nav[currentIndex + 1].url;
    nextInfo.title = nav[currentIndex + 1].title;
    if (nav[currentIndex - 1]) {
      previousInfo.url = nav[currentIndex - 1].url;
      previousInfo.title = nav[currentIndex - 1].title;
    }
  }

  return (
    <div className="next-prev-section">
      {previousInfo.url && currentIndex >= 0 ? (
        <Link
          to={nav[currentIndex - 1].url}
          className={'previousBtn'}
          onClick={() => traversePrevNext(nav[currentIndex - 1].url)}
        >
          <div className={'leftArrow'}>
            <svg
              preserveAspectRatio="xMidYMid meet"
              height="1em"
              width="1em"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="currentColor"
              className="_13gjrqj"
            >
              <g>
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </g>
            </svg>
          </div>
          <div className={'preRightWrapper'}>
            <div className={'smallContent'}>
              <span>Previous</span>
            </div>
            <div className={'nextPreviousTitle'}>
              <span>{nav[currentIndex - 1].title}</span>
            </div>
          </div>
        </Link>
      ) : null}
      {nextInfo.url && currentIndex >= 0 ? (
        <Link
          to={nav[currentIndex + 1].url}
          className={'nextBtn'}
          onClick={() => traversePrevNext(nav[currentIndex + 1].url)}
        >
          <div className={'nextRightWrapper'}>
            <div className={'smallContent'}>
              <span>Next</span>
            </div>
            <div className={'nextPreviousTitle'}>
              <span>{nav[currentIndex + 1] && nav[currentIndex + 1].title}</span>
            </div>
          </div>
          <div className={'rightArrow'}>
            <svg
              preserveAspectRatio="xMidYMid meet"
              height="1em"
              width="1em"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="currentColor"
              className="_13gjrqj"
            >
              <g>
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </g>
            </svg>
          </div>
        </Link>
      ) : null}
    </div>
  );
};

export default NextPrevious;
