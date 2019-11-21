import React, { Component } from 'react';
import Layout from '../components/Layout';
import useGalleryData from '../static_queries/useGalleryData';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import styles from '../styles/pages/galleries.module.scss';

const Galleries = () => {
  const galleries = useGalleryData();

  return (
    <Layout>
      <section className={styles.galleries}>
        {galleries.map(({ node: gallery }) => {
          console.log(gallery);
          const { frontmatter, fields } = gallery;
          const { slug } = fields;
          const { title, featured_photo } = frontmatter;
          return (
            <Link to={`gallery/${slug}`}>
              <Img fluid={featured_photo.childImageSharp.fluid} />
            </Link>
          );
        })}
      </section>
    </Layout>
  );
};

export default Galleries;
