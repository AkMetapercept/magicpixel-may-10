import React, { useEffect, useState } from 'react';
import config from '../../../config';
import TreeNode from './treeNode';
import { useSidebarContext } from '../../context/sidebarContext';

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

  // console.log('🚀 ~ file: tree.js:8 ~ calculateTreeData ~ originalData:', originalData);
  const tree = originalData.reduce(
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
      // console.log('🚀 ~ file: tree.js:27 ~ calculateTreeData ~ parts:', parts);

      let { items: prevItems } = accu;
      // console.log('🚀 ~ file: tree.js:29 ~ calculateTreeData ~ prevItems:', prevItems);

      const slicedParts =
        config.gatsby && config.gatsby.trailingSlash ? parts.slice(1, -2) : parts.slice(1, -1);
      // console.log('🚀 ~ file: tree.js:33 ~ calculateTreeData ~ slicedParts:', slicedParts);

      for (const part of slicedParts) {
        let tmp = prevItems && prevItems.find(({ label }) => label == part);

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
      // console.log('🚀 ~ file: tree.js:67 ~ calculateTreeData ~ accu:', accu);
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
      // console.log('prev obj', accu);
      sortNestedArrayByKey(accu);
      // console.log('object', accu.items.flat(Infinity));
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
      // console.log('🚀 ~ file: tree.js:97 ~ calculateTreeData ~ flatArray:', flatArray);
      // ==================================================================================

      return accu;
    },
    { items: [] }
  );

  const {
    sidebar: { forcedNavOrder = [] },
  } = config;

  const tmp = [...forcedNavOrder];

  if (config.gatsby && config.gatsby.trailingSlash) {
  }
  tmp.reverse();
  return tmp.reduce((accu, slug) => {
    // console.log('🚀 ~ file: tree.js:84 ~ returntmp.reduce ~ accu:', accu);
    const parts = slug.split('/');

    let { items: prevItems } = accu;

    const slicedParts =
      config.gatsby && config.gatsby.trailingSlash ? parts.slice(1, -2) : parts.slice(1, -1);

    for (const part of slicedParts) {
      let tmp = prevItems.find((item) => item && item.label == part);

      if (tmp) {
        if (!tmp.items) {
          tmp.items = [];
        }
      } else {
        tmp = { label: part, items: [] };
        prevItems.push(tmp);
      }
      if (tmp && tmp.items) {
        prevItems = tmp.items;
      }
    }
    // sort items alphabetically.
    prevItems.map((item) => {
      item.items = item.items.sort(function (a, b) {
        if (a.label < b.label) return -1;
        if (a.label > b.label) return 1;
        return 0;
      });
    });
    // =================== sort by order ==================
    // console.log('🚀 ~ file: tree.js:116 ~ prevItems.map ~ prevItems:', prevItems);
    // prevItems.map((item) => {
    //   item.items = item.items.sort(function (a, b) {
    //     if (a.order < b.order) return -1;
    //     if (a.order > b.order) return 1;
    //     return 0;
    //   });
    // });
    // =================== sort by order ==================
    const slicedLength =
      config.gatsby && config.gatsby.trailingSlash ? parts.length - 2 : parts.length - 1;

    const index = prevItems.findIndex(({ label }) => label === parts[slicedLength]);

    if (prevItems.length) {
      accu.items.unshift(prevItems.splice(index, 1)[0]);
    }
    // console.log('🚀 ~ file: tree.js:120 ~ returntmp.reduce ~ accu:', accu);
    return accu;
  }, tree);
};

const Tree = ({ edges }) => {
  // console.log('🚀 ~ file: tree.js:119 ~ Tree ~ edges:', edges);
  const { urlObject, setUrlObject } = useSidebarContext();

  let [treeData] = useState(() => {
    return calculateTreeData(edges);
  });
  useEffect(() => {
    setUrlObject(() => treeData);
  }, [treeData]);
  console.log('🚀 ~ file: tree.js:122 ~ let[treeData]=useState ~ treeData:', treeData);

  // const setDefaultCollapsed = () => {
  //   const defaultCollapsed = {};
  //   edges.map(({ node: { fields } }) => {
  //     // console.log(fields);
  //     if (window.location.pathname.startsWith(fields.slug)) {
  //       defaultCollapsed[fields.slug] = false;
  //     } else {
  //       defaultCollapsed[fields.slug] = true;
  //     }
  //   });
  //   return defaultCollapsed;
  // };
  // const [collapsed, setCollapsed] = useState(setDefaultCollapsed);

  // const toggle = (url) => {
  //   setCollapsed((prev) => {
  //     let newData = {};
  //     Object.keys(prev).map((link) => {
  //       if (url?.startsWith(link)) {
  //         if (url == link && !prev[link]) {
  //           newData[link] = true;
  //         } else {
  //           newData[link] = false;
  //         }
  //       } else {
  //         newData[link] = true;
  //       }
  //     });
  //     return newData;
  //   });
  // };

  return (
    <TreeNode
      className={`${config.sidebar.frontLine ? 'showFrontLine' : 'hideFrontLine'} firstLevel`}
      // setCollapsed={toggle}
      // collapsed={collapsed}
      {...treeData}
    />
  );
};

export default Tree;
