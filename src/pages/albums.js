import React, { Component } from 'react';
import Layout from '../components/Layout';
import useAlbumData from '../static_queries/useAlbumData';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import styles from '../styles/pages/galleries.module.scss';

const Albums = () => {
  const galleries = useAlbumData();

  return (
    <Layout>
      <section className={styles.galleries}>
        {galleries.map(({ node: gallery }) => {
          console.log(gallery);
          const { frontmatter, fields } = gallery;
          const { slug } = fields;
          const { title, featured_photo } = frontmatter;
          return (
            <Link to={`album/${slug}`}>
              <Img fluid={featured_photo.childImageSharp.fluid} />
            </Link>
          );
        })}
      </section>
    </Layout>
  );
};

export default Albums;
