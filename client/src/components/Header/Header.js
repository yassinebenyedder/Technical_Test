import React from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import TheBridgeLogo from '../../assets/TheBridgeLogo.png';

function Header() {
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
      <Link to="/">
          <img src={TheBridgeLogo} alt="The Bridge Logo" />
        </Link>
      </div>
    </div>
  );
}

export default Header;
