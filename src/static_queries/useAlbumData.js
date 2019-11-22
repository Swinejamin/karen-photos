import { graphql, useStaticQuery } from 'gatsby';

export default function useGalleryData() {
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
              featured_photo {
                childImageSharp {
                  fluid(maxWidth: 1800) {
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
