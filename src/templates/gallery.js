import React from 'react';
import Layout from '../components/Layout';
import { graphql } from 'gatsby';
import useGalleryData from '../static_queries/useGalleryData';
import styles from '../styles/templates/gallery.module.scss';
//this component handles the blur img & fade-ins
// import Img from 'gatsby-image';

export default function Blog() {
  // const data = props.data.markdownRemark;
  const allGalleryData = useGalleryData();
  console.log(allGalleryData);

  return (
    <Layout>
      <article className={styles.blog}></article>
    </Layout>
  );
}

//dynamic page query, must occur within each post context
//$slug is made available by context from createPages call in gatsby-node.js
export const getPostData = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      fields {
        slug
      }
      frontmatter {
        title
        author
        date(formatString: "MMMM Do, YYYY")
        hero_image {
          childImageSharp {
            fluid(maxWidth: 1500) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      html
    }
  }
`;
