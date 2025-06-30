'use client';

import styles from './Button.module.scss';

import { ReactNode, forwardRef } from 'react';

import clsx from 'clsx';

import { Typography } from '@/components/Typography';
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
  destructive?: boolean;
  testMetaData?: TestMetaData;
  icon?: ReactNode;
  spinner?: ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

// Default Spinner Component
const DefaultSpinner = ({ testMetaData }: { testMetaData?: TestMetaData }) => {
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
      destructive = false, // ✅ YOU WERE MISSING THIS
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
        [styles.destructive]: destructive,
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

        {!iconOnly && (
          <Typography
            as="span"
            variant="body"
            testMetaData={appendTestMetaData(testMetaData, 'Text')}
          >
            {children}
          </Typography>
        )}
      </button>
    );
  },
);

Button.displayName = 'Button';
