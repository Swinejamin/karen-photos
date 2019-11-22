import React from 'react';
import Layout from '../components/Layout';
import { graphql, Link } from 'gatsby';

import styles from '../styles/templates/album.module.scss';
import GatsbyImage from 'gatsby-image';
import useAlbumData from '../static_queries/useAlbumData';
//this component handles the blur img & fade-ins
// import Img from 'gatsby-image';

export default function Gallery(props) {
  const data = props.data.markdownRemark;
  // const allGalleryData = useGalleryData();

  const { frontmatter } = data;

  const { title, keywords, description, featured_photo, albums } = frontmatter;
  const albumSlugs = albums.map(album => `/${album.replace(/^.*[\\\/]|.md/g, '')}/`);
  console.log(albumSlugs);
  const filteredAlbums = useAlbumData().filter(({ node }) => {
    const key = data.fields.slug.replace(/\//g, '');

    return albumSlugs.includes(node.fields.slug);
  });

  return (
    <Layout>
      <article className={styles.album}>
        <h3 className={styles.title}>{title}</h3>
        {description && <p className={styles.description}>{description}</p>}
        {filteredAlbums &&
          filteredAlbums.map(album => {
            console.log(album);
            const { fields, frontmatter } = album.node;

            return (
              <Link to={`/albums/${fields.slug}`}>
                <GatsbyImage fluid={frontmatter.featured_photo.childImageSharp.fluid} className={styles.image} />
              </Link>
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
