import { graphql, useStaticQuery } from 'gatsby';

export default function useGalleryData() {
  const data = useStaticQuery(graphql`
    query getGalleryData {
      allMarkdownRemark(
        filter: { fields: { collection: { eq: "galleries" } } }
        sort: { order: DESC, fields: frontmatter___date }
      ) {
        edges {
          node {
            id
            frontmatter {
              date(formatString: "MMMM Do, YYYY")
              description
              title
              albums
              featured_album
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `);
  return data.allMarkdownRemark.edges;
}
