import { graphql, useStaticQuery } from 'gatsby';

export default function useAlbumData() {
  const data = useStaticQuery(graphql`
    query getAlbumData {
      allMarkdownRemark(
        filter: { fields: { collection: { eq: "albums" } } }
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
              featured_photo {
                childImageSharp {
                  fluid(maxWidth: 1800) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }

              galleries {
                title
                featured_photo {
                  childImageSharp {
                    fluid {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
                description
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
