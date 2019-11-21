import React from 'react';
import Layout from '../components/Layout';
import FeaturedPhoto from '../components/FeaturedPhoto';
import useFeaturedPhotos from '../static_queries/useFeaturedPhotos';
export default function IndexPage() {
  const photos = useFeaturedPhotos();
  return (
    <Layout page="home" fullWidthContent>
      <section>
        {photos.map(({ node }) => (
          <FeaturedPhoto {...node.frontmatter} key={node.id} />
        ))}
      </section>
    </Layout>
  );
}
