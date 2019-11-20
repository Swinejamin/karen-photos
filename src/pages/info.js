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
          <span dangerouslySetInnerHTML={{ __html: infoData.description }}></span>
          <span dangerouslySetInnerHTML={{ __html: infoData.cta }}></span>
        </h2>
        <ul>
          {infoData.contact.email && (
            <li>
              <a href={`mailto:${infoData.contact.email}`} target="_blank" rel=" noopener noreferrer">
                Email: {infoData.contact.email}
              </a>
            </li>
          )}
          {infoData.contact.facebook_handle && (
            <li>
              <a
                href={`https://facebook.com/${infoData.contact.facebook_handle}`}
                target="_blank"
                rel=" noopener noreferrer"
              >
                Facebook: @{infoData.contact.facebook_handle}
              </a>
            </li>
          )}
          {infoData.contact.instagram_handle && (
            <li>
              <a
                href={`https://instagram.com/${infoData.contact.instagram_handle}`}
                target="_blank"
                rel=" noopener noreferrer"
              >
                Instagram: @{infoData.contact.instagram_handle}
              </a>
            </li>
          )}
        </ul>
      </section>
    </Layout>
  );
}
