import React from 'react';
import styles from './Button.module.css';

function Button({ 
  children, 
  variant = 'primary', 
  className, 
  as: Component = 'button',
  ...props 
}) {
  // definimos classes com base no variant e em estados
  const variantClass = variant === 'secondary' ? styles.secondary : '';
  // concatenamos tudo num único string de classes
  const classes = `${styles.btn} ${variantClass} ${className || ''}`.trim();
  
  return (
    <Component 
      className={classes} 
      {...props}
    >
      {children}
    </Component>
  );
}

export default Button;
