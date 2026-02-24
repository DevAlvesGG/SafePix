import React from 'react';
import styles from './Card.module.css';

function Card({ children, className = '', ...props }) {
  return (
    <div className={`${styles.card} ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}

export default Card;
