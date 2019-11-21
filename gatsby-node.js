const path = require('path');
const { fmImagesToRelative } = require('gatsby-remark-relative-images');
module.exports.onCreateNode = ({ node, actions, getNode }) => {
  // Transform the new node here and create a new node or
  // create a new node field.
  const { createNodeField } = actions;
  fmImagesToRelative(node);
  if (node.internal.type === 'MarkdownRemark') {
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
};

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  //dynamically create pages here
  //get path to template
  const blogTemplate = path.resolve('./src/templates/blog.js');
  const galleryTemplate = path.resolve('./src/templates/gallery.js');
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
  const galleryEdges = allEdges.filter(edge => edge.node.fields.collection === `galleries`);

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
  galleryEdges.forEach(edge => {
    createPage({
      component: galleryTemplate,
      path: `/gallery/${edge.node.fields.slug}`,
      context: {
        slug: edge.node.fields.slug,
      },
    });
  });
};
