import React from 'react';
import styles from '../styles/components/Logo.module.css';

const Logo: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <img 
        src="/mayo.png" 
        alt="MAYO" 
        className={styles.image} 
      />
      <div className={styles.textContainer}>
        <span className={styles.mayo}>MAYO</span>
        <span className={styles.share}>Share</span>
      </div>
    </div>
  );
};

export default Logo;