'use client';

import styles from './Button.module.scss';

import React, { ReactNode, forwardRef } from 'react';

import clsx from 'clsx';

import { TestMetaData } from '@/interfaceCollection/TestMetaData.interface';
import { appendTestMetaData } from '@/tools';

// Variants and Sizes
type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'xl' | 'lg' | 'md' | 'sm';

type ButtonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  iconOnly?: boolean;
  testMetaData?: TestMetaData;
  icon?: ReactNode;
  spinner?: ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

// Default Spinner Component
const DefaultSpinner: React.FC<{ testMetaData?: TestMetaData }> = ({ testMetaData }) => {
  const meta = appendTestMetaData(testMetaData, 'Spinner');
  return <span className={clsx(styles.spinner)} {...meta} />;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      disabled = false,
      loading = false,
      fullWidth = false,
      iconOnly = false,
      testMetaData,
      icon,
      spinner,
      className,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    const buttonClasses = clsx(
      styles.button,
      styles[variant],
      styles[size],
      {
        [styles.disabled]: isDisabled,
        [styles['full-width']]: fullWidth,
        [styles['icon-only']]: iconOnly,
        [styles.loading]: loading,
      },
      className,
    );

    return (
      <button
        ref={ref}
        className={buttonClasses}
        disabled={isDisabled}
        {...testMetaData}
        {...props}
      >
        {loading ? (spinner ?? <DefaultSpinner testMetaData={testMetaData} />) : icon}
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
