import React from 'react';
import Layout from '../components/Layout';
import useGalleryData from '../static_queries/useGalleryData';
import { Link } from 'gatsby';
import GatsbyImage from 'gatsby-image';
import useAlbumData from '../static_queries/useAlbumData';

const Galleries = () => {
  const galleries = useGalleryData();

  const albums = useAlbumData();
  return (
    <Layout>
      {galleries.map(({ node }) => {
        const { title, featured_album } = node.frontmatter;
        const { slug } = node.fields;

        const fa = albums.find(
          album => album.node.fields.slug === `/${featured_album?.replace(/^.*[\\\/]|.md/g, '')}/`
        );
        return (
          <Link key={node.id} to={`/galleries/${slug}`}>
            {fa && <GatsbyImage fluid={fa.node.frontmatter.featured_photo.childImageSharp.fluid} />}
            <span>{title}</span>
          </Link>
        );
      })}
    </Layout>
  );
};

export default Galleries;
