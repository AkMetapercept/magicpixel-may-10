import React, { Component } from 'react';
import { graphql } from 'gatsby';
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer';

import { LayoutHome, LayoutOther } from '$components';
import NextPrevious from '../components/NextPrevious';
import config from '../../config';
import Footer from '../components/footer/footer';

const forcedNavOrder = config.sidebar.forcedNavOrder;

export default class MDXRuntimeTest extends Component {
  render() {
    const { data } = this.props;

    if (!data) {
      return this.props.children;
    }
    const { allMdx, mdx } = data;

    const navItems = allMdx.edges
      .map(({ node }) => node.fields.slug)
      .filter((slug) => slug !== '/');

    navItems.sort();

    navItems.reduce(
      (acc, cur) => {
        if (forcedNavOrder.find((url) => url === cur)) {
          return { ...acc, [cur]: [cur] };
        }

        let prefix = cur.split('/')[1];

        if (config.gatsby && config.gatsby.trailingSlash) {
          prefix = prefix + '/';
        }

        if (prefix && forcedNavOrder.find((url) => url === `/${prefix}`)) {
          return { ...acc, [`/${prefix}`]: [...acc[`/${prefix}`], cur] };
        } else {
          return { ...acc, items: [...acc.items, cur] };
        }
      },
      { items: [] }
    );

    const nav = forcedNavOrder
      .reduce((acc, cur) => {
        return acc.concat(navItems[cur]);
      }, [])
      .concat(navItems.items)
      .map((slug) => {
        if (slug) {
          const { node } = allMdx.edges.find(({ node }) => node.fields.slug === slug);

          return { title: node.fields.title, url: node.fields.slug };
        }
      });

    // meta tags
    const metaTitle = mdx.frontmatter.metaTitle;

    return mdx?.fields?.slug === '/' ? (
      <LayoutHome {...this.props} edges={allMdx.edges} metaTitle={metaTitle}>
        <div className="main-body-wrapper">
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </div>
        <div className={'addPaddTopBottom'}>
          <NextPrevious mdx={mdx} nav={nav} allMdx={allMdx} {...this.props} />
        </div>
        <Footer />
      </LayoutHome>
    ) : (
      <LayoutOther {...this.props} edges={allMdx.edges} metaTitle={metaTitle}>
        <div className="main-body-wrapper">
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </div>
        <div className={'addPaddTopBottom'}>
          <NextPrevious mdx={mdx} nav={nav} allMdx={allMdx} {...this.props} />
        </div>
        <Footer />
      </LayoutOther>
    );
  }
}

export const pageQuery = graphql`
  query ($id: String!) {
    site {
      siteMetadata {
        title
        docsLocation
      }
    }
    mdx(fields: { id: { eq: $id } }) {
      fields {
        id
        title
        slug
      }
      body
      tableOfContents
      parent {
        ... on File {
          relativePath
        }
      }
      frontmatter {
        metaTitle
      }
    }
    allMdx {
      edges {
        node {
          fields {
            slug
            title
          }
          frontmatter {
            order
          }
        }
      }
    }
  }
`;
