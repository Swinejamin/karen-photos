const path = require('path');
// const { fmImagesToRelative } = require('gatsby-remark-relative-images');
const { createFilePath } = require(`gatsby-source-filesystem`);
const { normalizeArray, normalizePath } = require('./utils.js');
function normalizeObject(obj, nodeInfo) {
  const newObj = {};
  const type = null;
  for (let key in obj) {
    if (Array.isArray(obj[key])) {
      const na = normalizeArray(obj[key], nodeInfo);
      newObj[key] = na.array;
    } else if (typeof obj[key] === 'object') {
      newObj[key] = normalizeObject(obj[key], nodeInfo);
    } else {
      // console.dir(`Path: ${key}`);
      newObj[key] = normalizePath(obj[key], nodeInfo);
    }
  }
  return { type, fm: newObj };
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
      albums: [File] @fileByRelativePath

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
      const parent = getNode(node.parent);
      const slug = createFilePath({ node, getNode, basePath: parent.sourceInstanceName });
      const res = normalizeObject(node.frontmatter, {
        fileAbsolutePath: node.fileAbsolutePath,
      });
      node.frontmatter = res.fm;

      // const value = path.basename(node.fileAbsolutePath, '.md');
      createNodeField({
        //same as node: node
        node,
        name: 'slug',
        value: slug,
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
  const templates = {
    posts: path.resolve('./src/templates/blog.js'),
    albums: path.resolve('./src/templates/album.js'),
  };
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

  /*
  filters all markdown pages to only those with templates provided
  creates a page with basepath base on the template name & unique file name
  */
  allEdges
    .filter(({ node }) => templates.hasOwnProperty(node.fields.collection))
    .forEach(({ node }) => {
      const { fields } = node;
      console.log(fields.collection);
      createPage({
        component: templates[fields.collection],
        path: `/${fields.collection}${fields.slug}`,
        context: {
          slug: fields.slug,
        },
      });
    });

  // albumEdges.forEach(edge => {
  //   createPage({
  //     component: albumTemplate,
  //     path: `/album/${edge.node.fields.slug}`,
  //     context: {
  //       slug: edge.node.fields.slug,
  //     },
  //   });
  // });
};
