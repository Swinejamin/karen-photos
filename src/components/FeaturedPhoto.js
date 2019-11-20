import Img from 'gatsby-image';
import React from 'react';
import { graphql, StaticQuery } from 'gatsby';

const FeaturedPhoto = ({ data, title, description, path }) => {
  const query = graphql`
    query {
      fileName: file(relativePath: { eq: ${path} }) {
        childImageSharp {
          fluid(maxWidth: 400, maxHeight: 250) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `;
  return <Img fluid={data.file.childImageSharp.fluid} alt={`${title}: ${description}`} />;
};

export default FeaturedPhoto;

export const getFeaturedPhoto = graphql`
  query($slug: String!) {
    fileName: file(relativePath: { eq: $slug }) {
      childImageSharp {
        fluid(maxWidth: 400, maxHeight: 250) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;
