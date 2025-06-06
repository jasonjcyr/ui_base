import styles from './Button.module.scss';

import React from 'react';

export interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = 'primary',
  disabled = false,
}) => {
  return (
    <button className={`${styles.btn} ${styles[variant]}`} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};

export default Button;
