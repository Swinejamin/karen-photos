import Img from 'gatsby-image';
import React from 'react';
import styles from '../styles/components/featuredphoto.module.scss';

const FeaturedPhoto = ({ title, description, photo, ...rest }) => {
  console.log({ title, description, photo, ...rest });
  return (
    <div className={styles.photo}>
      <Img fluid={photo?.childImageSharp?.fluid} alt={`${title}: ${description}`} />
    </div>
  );
};

export default FeaturedPhoto;
