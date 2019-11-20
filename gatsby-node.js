const path = require('path');

module.exports.onCreateNode = ({ node, actions }) => {
  // Transform the new node here and create a new node or
  // create a new node field.
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    const slug = path.basename(node.fileAbsolutePath, '.md');
    createNodeField({
      //same as node: node
      node,
      name: 'slug',
      value: slug,
    });
  }
};

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  //dynamically create pages here
  //get path to template
  const blogTemplate = path.resolve('./src/templates/blog.js');
  //get slugs
  const results = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `);
  const allEdges = results.data.allMarkdownRemark.edges;

  const blogEdges = allEdges.filter(edge => edge.node.fields.collection === `posts`);
  // const pageEdges = allEdges.filter(edge => edge.node.fields.collection === `pages`);
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
};
