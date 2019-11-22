import React from 'react';
import { Link } from 'gatsby';
import styles from '../styles/components/header.module.scss';

export default function Header(props) {
  return (
    <header className={`${styles.header} ${props.page === 'info' && styles.info_page}`}>
      <Link to="/">
        <h1>{props.title}</h1>
      </Link>
      <nav className={styles.nav} role="navigation" aria-label="main navigation">
        <Link to={'/albums'} className={styles.navItem} activeClassName={styles.navItemActive}>
          Albums
        </Link>
        <Link to={'/info'} className={styles.navItem} activeClassName={styles.navItemActive}>
          Info
        </Link>
      </nav>
    </header>
  );
}
