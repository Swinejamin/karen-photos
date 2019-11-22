const path = require('path');
// const { fmImagesToRelative } = require('gatsby-remark-relative-images');

const { isAbsolute } = require('path');
const isValidPath = require('is-valid-path');

const { getRelativePath } = require('./utils.js');

function normalizePath(path, nodeInfo) {
  const { fileAbsolutePath } = nodeInfo;

  const isString = typeof path === 'string';

  // Stop if field is not a valid path
  if (!path || !isString || !isValidPath(path)) {
    // Remove field if empty to prevent Gatsby crashing
    if (isString && path.length === 0) {
      return undefined;
    }
  }

  // Normalize path field from absolute to relative
  if (path && isString && isAbsolute(path)) {
    return getRelativePath(fileAbsolutePath, path);
  }

  return path;
}

function normalizeArray(arr, nodeInfo) {
  const newArr = [];
  for (let val of arr) {
    if (Array.isArray(val)) {
      newArr.push(normalizeArray(val, nodeInfo));
    } else if (typeof val === 'object') {
      newArr.push(normalizeObject(val, nodeInfo));
    } else {
      newArr.push(normalizePath(val, nodeInfo));
    }
  }
  return newArr;
}

function normalizeObject(obj, nodeInfo) {
  const newObj = {};
  for (let key in obj) {
    // don't convert if pathFields is specified and this key isn't in it
    if (nodeInfo.pathFields && Array.isArray(nodeInfo.pathFields) && nodeInfo.pathFields.indexOf(key) < 0) {
      newObj[key] = obj[key];
    } else if (Array.isArray(obj[key])) {
      newObj[key] = normalizeArray(obj[key], nodeInfo);
    } else if (typeof obj[key] === 'object') {
      newObj[key] = normalizeObject(obj[key], nodeInfo);
    } else {
      newObj[key] = normalizePath(obj[key], nodeInfo);
    }
  }
  return newObj;
}
module.exports = {
  sourceNodes: ({ actions, schema }) => {
    const { createTypes } = actions;
    createTypes(`
    type MarkdownRemarkFrontmatter  {
      hero_image: File @fileByRelativePath
      featured_photo: File @fileByRelativePath
      photo: File @fileByRelativePath
      images: [File] @fileByRelativePath
    }

    type MarkdownRemark implements Node {
      frontmatter: MarkdownRemarkFrontmatter
    }
  `);
  },
  onCreateNode: ({ node, actions, getNode }) => {
    // Transform the new node here and create a new node or
    // create a new node field.
    const { createNodeField } = actions;
    if (node.internal.type === 'MarkdownRemark') {
      const res = normalizeObject(node.frontmatter, {
        fileAbsolutePath: node.fileAbsolutePath,
      });
      node.frontmatter = res;
      console.log(node.frontmatter);

      const value = path.basename(node.fileAbsolutePath, '.md');
      const parent = getNode(node.parent);
      createNodeField({
        //same as node: node
        node,
        name: 'slug',
        value,
      });

      //allows us to search by content type, e.g. 'featured_photos';
      createNodeField({
        //same as node: node
        node,
        name: 'collection',
        value: parent.sourceInstanceName,
      });
    }
  },
};

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  //dynamically create pages here
  //get path to template
  const blogTemplate = path.resolve('./src/templates/blog.js');
  const albumTemplate = path.resolve('./src/templates/album.js');
  //get slugs
  const results = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
              collection
            }
          }
        }
      }
    }
  `);
  const allEdges = results.data.allMarkdownRemark.edges;

  const blogEdges = allEdges.filter(edge => edge.node.fields.collection === `posts`);
  const albumEdges = allEdges.filter(edge => edge.node.fields.collection === `albums`);

  // todo: do the same as blog but for galleries, albums
  //    will need to add to gatsby-config as well
  //  const pageEdges = allEdges.filter(edge => edge.node.fields.collection === `pages`);
  //create new pages with unique slug
  blogEdges.forEach(edge => {
    createPage({
      component: blogTemplate,
      path: `/blog/${edge.node.fields.slug}`,
      context: {
        slug: edge.node.fields.slug,
      },
    });
  });

  albumEdges.forEach(edge => {
    createPage({
      component: albumTemplate,
      path: `/album/${edge.node.fields.slug}`,
      context: {
        slug: edge.node.fields.slug,
      },
    });
  });
};
