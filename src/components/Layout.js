import React from 'react';
import Header from './Header';
import Helmet from 'react-helmet';
import useSiteMetadata from '../static_queries/useSiteMetadata';
import styles from '../styles/components/layout.module.scss';
import PropTypes from 'prop-types';
export default function Layout(props) {
  const { title, description } = useSiteMetadata();
  const { children, page, fullWidthContent } = props;
  return (
    <section className={`${styles.layout} ${props.page === 'info' ? styles.info_page : ''}`}>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <Header page={props.page} title={title} />
      <div className={`${styles.content} ${fullWidthContent ? styles.fullWidth : ''}`}>{props.children}</div>
    </section>
  );
}
Layout.propTypes = {
  page: PropTypes.string,
  fullWidthContent: PropTypes.bool,
};
