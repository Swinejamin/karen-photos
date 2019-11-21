import { graphql, useStaticQuery } from 'gatsby';

export default function useGalleryData() {
  const data = useStaticQuery(graphql`
    query getGalleryData {
      allMarkdownRemark(
        filter: { fields: { collection: { eq: "featured_photos" } } }
        sort: { order: DESC, fields: frontmatter___date }
      ) {
        edges {
          node {
            id
            frontmatter {
              date(formatString: "MMMM Do, YYYY")
              description
              title
              keywords
              hero_image {
                childImageSharp {
                  fluid(maxWidth: 800) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
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
