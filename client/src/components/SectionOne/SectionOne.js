import React from 'react';
import styles from './SectionOne.module.css';

function SectionOne() {
  return (
    <div className={styles.sectionOne}>
      <div className={styles.textContainer}>
        <h2>Improve your skills on your own to prepare for a better future</h2>
        <button>REGISTER NOW</button>
      </div>
    </div>
  );
}

export default SectionOne;
