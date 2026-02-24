import React from 'react';
import styles from './Button.module.css';

function Button({ 
  children, 
  variant = 'primary', 
  className, 
  as: Component = 'button',
  ...props 
}) {
  const variantClass = variant === 'secondary' ? styles.secondary : '';
  const classes = `${styles.btn} ${variantClass} ${className || ''}`.trim();
  
  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
}

export default Button;
