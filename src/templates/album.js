import React from 'react';
import Layout from '../components/Layout';
import { graphql, Link } from 'gatsby';

import styles from '../styles/templates/album.module.scss';
import GatsbyImage from 'gatsby-image';
//this component handles the blur img & fade-ins
// import Img from 'gatsby-image';

export default function Album(props) {
  const data = props.data.markdownRemark;
  // const allGalleryData = useGalleryData();
  // console.log(allGalleryData);
  const { frontmatter } = data;
  console.log(data);
  const { title, keywords, description, images, featured_photo } = frontmatter;
  return (
    <Layout>
      <article className={styles.album}>
        <h3 className={styles.title}>{title}</h3>
        {description && <p className={styles.description}>{description}</p>}
        {images &&
          images.map(image => {
            console.log(image);
            const slug = image;

            return <GatsbyImage fluid={image.childImageSharp.fluid} className={styles.image} />;
          })}
        <div className={styles.keywords}>
          {keywords &&
            keywords.map(keyword => (
              <Link to={`/keywords/${keyword}`} className={styles.keyword}>
                {keyword}
              </Link>
            ))}
        </div>
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
        date(formatString: "MMMM Do, YYYY")
        images {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
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
