import React from 'react';
import Layout from '../components/Layout';
import useSiteMetadata from '../static_queries/useSiteMetadata';
import FeaturedPhoto from '../components/FeaturedPhoto';

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
