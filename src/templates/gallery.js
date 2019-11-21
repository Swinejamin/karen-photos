import React from 'react';
import Layout from '../components/Layout';
import { graphql, Link } from 'gatsby';

import styles from '../styles/templates/gallery.module.scss';
//this component handles the blur img & fade-ins
// import Img from 'gatsby-image';

export default function Blog(props) {
  const data = props.data.markdownRemark;
  // const allGalleryData = useGalleryData();
  // console.log(allGalleryData);
  const { frontmatter } = data;
  const { title, keywords, description } = frontmatter;
  return (
    <Layout>
      <article className={styles.blog}>
        <h3>{title}</h3>
        <p>{description}</p>

        {keywords.map(keyword => (
          <Link to={`keywords/${keyword}`}>{keyword}</Link>
        ))}
      </article>
    </Layout>
  );
}

//dynamic page query, must occur within each post context
//$slug is made available by context from createPages call in gatsby-node.js
export const getGalleryData = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      fields {
        slug
      }
      frontmatter {
        title
        author
        date(formatString: "MMMM Do, YYYY")
        images
        keywords
        description
        featured_photo {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      html
    }
  }
`;
