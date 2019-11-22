import React from 'react';
import Layout from '../components/Layout';
import useGalleryData from '../static_queries/useGalleryData';
import { Link } from 'gatsby';
import GatsbyImage from 'gatsby-image';
import useAlbumData from '../static_queries/useAlbumData';
import styles from '../styles/pages/galleries.module.scss';

const Galleries = () => {
  const galleries = useGalleryData();

  const allAlbums = useAlbumData();

  return (
    <Layout>
      <section className={styles.galleries}>
        {galleries.map(({ node }) => {
          const { title, featured_album, description, albums } = node.frontmatter;
          const { slug } = node.fields;

          const fa = allAlbums.find(album => {
            const featuredAlbumSlug = `${featured_album}`.replace(/content\/albums\/|.md$|\/$/g, '').toLowerCase();
            const built = album.node.fields.slug.replace(/^\/|\/$/g, '').toLowerCase();
            const matched = featuredAlbumSlug === built;

            return matched;
          });
          return (
            featured_album &&
            albums.length > 0 && (
              <Link key={node.id} to={`/galleries/${slug}`} className={styles.gallery}>
                <figure className={styles.figure}>
                  {fa && (
                    <GatsbyImage
                      fluid={fa.node.frontmatter.featured_photo.childImageSharp.fluid}
                      className={styles.image}
                    />
                  )}
                  <figcaption className={styles.caption}>
                    {description && <p className={styles.description}>{description}</p>}
                    <span className={styles.title}>{title}</span>
                  </figcaption>
                </figure>
              </Link>
            )
          );
        })}
      </section>
    </Layout>
  );
};

export default Galleries;
