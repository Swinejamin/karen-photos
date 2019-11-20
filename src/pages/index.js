import React from 'react';
import Layout from '../components/Layout';

import useSiteMetadata from '../static_queries/useSiteMetadata';
import Img from 'gatsby-image';
const FeaturedPhoto = ({ title, description, photo }) => {
  return <Img src={require(photo)} alt={`${title}: ${description}`} />;
};
export default function IndexPage() {
  const { featured_photos } = useSiteMetadata();
  return (
    <Layout page="home">
      <section>
        {featured_photos.map(photo => (
          <FeaturedPhoto {...photo} />
        ))}
      </section>
    </Layout>
  );
}
