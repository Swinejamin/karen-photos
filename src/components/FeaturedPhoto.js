import Img from 'gatsby-image';
import React from 'react';
import styles from '../styles/components/featuredphoto.module.scss';

const FeaturedPhoto = ({ title, description, photo, ...rest }) => {
  return (
    <figure className={styles.photo}>
      <Img fluid={photo?.childImageSharp?.fluid} alt={`${title}: ${description}`} />
      <figcaption className={styles.caption}>
        <span className={styles.title}>{title}</span>
        {description && <span className={styles.description}>{description}</span>}
      </figcaption>
    </figure>
  );
};

export default FeaturedPhoto;
