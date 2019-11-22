import React, { Component } from 'react';
import Layout from '../components/Layout';
import useAlbumData from '../static_queries/useAlbumData';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import styles from '../styles/pages/albums.module.scss';

const Albums = () => {
  const albums = useAlbumData();
  console.log(albums);
  return (
    <Layout>
      <section className={styles.albums}>
        {albums.map(({ node: album }) => {
          console.log(album);
          const { frontmatter, fields } = album;
          const { slug } = fields;
          const { title, featured_photo } = frontmatter;
          return (
            <Link to={`album/${slug}`} className={styles.album}>
              <Img fluid={featured_photo.childImageSharp.fluid} />
            </Link>
          );
        })}
      </section>
    </Layout>
  );
};

export default Albums;
