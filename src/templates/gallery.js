import React from 'react';
import Layout from '../components/Layout';
import { graphql, Link } from 'gatsby';

import styles from '../styles/templates/gallery.module.scss';
import GatsbyImage from 'gatsby-image';
import useAlbumData from '../static_queries/useAlbumData';
//this component handles the blur img & fade-ins
// import Img from 'gatsby-image';

export default function Gallery(props) {
  const data = props.data.markdownRemark;
  // const allGalleryData = useGalleryData();

  const { frontmatter } = data;

  const { title, keywords, description, featured_album, albums } = frontmatter;

  const albumSlugs = albums.map(album => album.replace(/content\/albums\/|.md$|\/$/g, '').toLowerCase());

  const filteredAlbums = useAlbumData().filter(({ node }) => {
    const key = node.fields.slug.replace(/^\/|\/$/g, '').toLowerCase();

    return albumSlugs.includes(key);
  });
  console.log(featured_album);
  return (
    <Layout>
      <article className={styles.gallery}>
        <Link to={'/galleries'} className={styles.backLink}>
          Back to galleries
        </Link>
        <h3 className={styles.title}>{title}</h3>
        {description && <p className={styles.description}>{description}</p>}
        <div className={styles.listing}>
          {filteredAlbums &&
            filteredAlbums.map(album => {
              const { fields, frontmatter } = album.node;
              console.log(album);
              return (
                frontmatter.images.length > 0 && (
                  <Link to={`/albums/${fields.slug}`.toLowerCase()} key={fields.slug}>
                    {frontmatter?.featured_photo && (
                      <GatsbyImage fluid={frontmatter.featured_photo.childImageSharp.fluid} className={styles.image} />
                    )}
                  </Link>
                )
              );
            })}
          <div className={styles.keywords}>
            {keywords &&
              keywords.map(keyword => (
                <Link to={`/keywords/${keyword}`} className={styles.keyword}>
                  {keyword}
                </Link>
              ))}
          </div>
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
        collection
      }
      frontmatter {
        title
        date(formatString: "MMMM Do, YYYY")

        description
        albums
        featured_album
      }
      html
    }
  }
`;
