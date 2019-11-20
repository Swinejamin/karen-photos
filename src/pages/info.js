import React from 'react';
import Layout from '../components/Layout';
import infoStyles from '../styles/pages/info.module.scss';
import useSiteMetaData from '../static_queries/useSiteMetadata';

export default function Info() {
  const { infoData } = useSiteMetaData();
  return (
    <Layout page="info" bgColor={infoData.background_color}>
      <section className={infoStyles.info_blurb}>
        <h2>
          <div dangerouslySetInnerHTML={{ __html: infoData.description }}></div>
          <div dangerouslySetInnerHTML={{ __html: infoData.cta }}></div>
        </h2>
        <ul>
          <li>
            <p>
              <a href={`mailto:${infoData.contact.email}`}>Email: {infoData.contact.email}</a>
            </p>
          </li>
          <li>
            <p>
              <a href={`https://facebook.com/${infoData.contact.facebook_handle}`}>
                Facebook: @{infoData.contact.facebook_handle}
              </a>
            </p>
          </li>
          <li>
            <p>
              <a href={`https://instagram.com/${infoData.contact.instagram_handle}`}>
                Instagram: @{infoData.contact.instagram_handle}
              </a>
            </p>
          </li>
        </ul>
      </section>
    </Layout>
  );
}
