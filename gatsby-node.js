const path = require('path');
// const { fmImagesToRelative } = require('gatsby-remark-relative-images');
const { createFilePath } = require(`gatsby-source-filesystem`);
const { normalizeObject } = require('./utils.js');

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
      const parent = getNode(node.parent);
      const slug = createFilePath({ node, getNode });
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
    galleries: path.resolve('./src/templates/gallery.js'),
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
      const path = `/${fields.collection}${fields.slug.toLowerCase()}`;
      console.log(path);

      createPage({
        component: templates[fields.collection],
        path,
        context: {
          slug: fields.slug,
        },
      });
    });
};
