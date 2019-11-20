import { graphql, useStaticQuery } from 'gatsby';

export default function useBlogData() {
  const data = useStaticQuery(graphql`
    query FeaturedPhotosQuery {
      allMarkdownRemark(filter: { fields: { collection: { eq: "featured_photos" } } }) {
        edges {
          node {
            id
            frontmatter {
              description
              title
              date
              photo {
                childImageSharp {
                  fluid {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    }
  `);
  return data.allMarkdownRemark.edges;
}
