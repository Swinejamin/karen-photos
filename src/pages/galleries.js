import React from 'react';
import Layout from '../components/Layout';
import useGalleryData from '../static_queries/useGalleryData';
import { Link } from 'gatsby';
import GatsbyImage from 'gatsby-image';

const Galleries = () => {
  const galleries = useGalleryData();
  return (
    <Layout>
      {galleries.map(({ node }) => {
        console.log(node);
        const { title, featured_photo } = node.frontmatter;
        const { slug } = node.fields;
        return (
          <Link key={node.id} to={`/galleries/${slug}`}>
            {featured_photo && <GatsbyImage fluid={featured_photo.childSharpImage.fluid} />}
            <span>{title}</span>
          </Link>
        );
      })}
    </Layout>
  );
};

export default Galleries;
