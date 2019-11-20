import { graphql, useStaticQuery } from 'gatsby';

export default function useHomepageData() {
  const data = useStaticQuery(graphql`
    query getHomepageData {
      allMarkdownRemark(sort: { order: DESC, fields: frontmatter___date }, limit: 5) {
        edges {
          node {
            id
            frontmatter {
              date(formatString: "MMMM Do, YYYY")
              description
              title
              photo {
                childImageSharp {
                  fluid(maxWidth: 800) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
            excerpt(pruneLength: 200)
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
