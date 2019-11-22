import React from 'react';
import Layout from '../components/Layout';
import { graphql, Link } from 'gatsby';

import styles from '../styles/templates/gallery.module.scss';
import GatsbyImage from 'gatsby-image';
//this component handles the blur img & fade-ins
// import Img from 'gatsby-image';

export default function Album(props) {
  const data = props.data.markdownRemark;
  // const allGalleryData = useGalleryData();
  // console.log(allGalleryData);
  const { frontmatter } = data;
  const { title, keywords, description, galleries, featured_photo } = frontmatter;
  return (
    <Layout>
      <article className={styles.album}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        {galleries.map(gallery => {
          const { fields } = gallery;

          const { slug } = fields;
          return (
            <Link to={`gallery/${slug}`}>
              <GatsbyImage fluid={featured_photo.childImageSharp.fluid} className={styles.image} />
            </Link>
          );
        })}
        <div className={styles.keywords}>
          {keywords.map(keyword => (
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
        galleries {
          title
        }
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
