import styles from './Button.module.scss';

import React from 'react';

import clsx from 'clsx';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'xl' | 'lg' | 'md' | 'sm';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  iconOnly?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const BaseButton: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  iconOnly = false,
  className,
  ...props
}) => {
  const buttonClasses = clsx(
    styles.button,
    styles[variant],
    styles[size],
    {
      [styles.disabled]: disabled,
      [styles['full-width']]: fullWidth,
      [styles['icon-only']]: iconOnly,
      [styles.loading]: loading,
    },
    className,
  );

  return (
    <button className={buttonClasses} disabled={disabled || loading} {...props}>
      {loading && <Button.Spinner />}
      {children}
    </button>
  );
};
const ButtonIcon: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({ className, ...props }) => {
  return (
    <span className={clsx(styles.icon, className)} {...props}>
      {props.children}
    </span>
  );
};
const ButtonSpinner: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({
  className,
  ...props
}) => {
  return (
    <span className={clsx(styles.spinner, className)} {...props}>
      {props.children}
    </span>
  );
};
export const Button = Object.assign(BaseButton, {
  Icon: ButtonIcon,
  Spinner: ButtonSpinner,
});
