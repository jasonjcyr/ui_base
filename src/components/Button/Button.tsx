'use client';

import styles from './Button.module.scss';

import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

import clsx from 'clsx';

import { Typography } from '@/components/Typography';
import { TestMetaData } from '@/interfaceCollection/TestMetaData.interface';
import { appendTestMetaData } from '@/tools';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'xl' | 'lg' | 'md' | 'sm';

type BaseProps<C extends ElementType> = {
  as?: C;
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  iconOnly?: boolean;
  destructive?: boolean;
  icon?: ReactNode;
  spinner?: ReactNode;
  className?: string;
  testMetaData?: TestMetaData;
} & Omit<ComponentPropsWithoutRef<C>, 'as' | 'children' | 'disabled'>;

type WithChildren = {
  iconOnly?: false;
  children: ReactNode;
};

type IconOnly = {
  iconOnly: true;
  children?: never;
};

type ButtonProps<C extends ElementType> = BaseProps<C> & (WithChildren | IconOnly);

export const Button = <C extends ElementType = 'button'>({
  as,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  iconOnly = false,
  destructive = false,
  icon,
  spinner,
  className,
  testMetaData,
  children,
  ...props
}: ButtonProps<C>) => {
  const isDisabled = disabled || loading;
  const Component = as || 'button';
  const isAnchor = Component === 'a';

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

  const meta = appendTestMetaData(testMetaData, 'Button');

  return (
    <Component
      className={buttonClasses}
      {...(isAnchor ? { 'aria-disabled': isDisabled } : { disabled: isDisabled })}
      {...meta}
      {...props}
    >
      {loading
        ? (spinner ?? (
            <span className={styles.spinner} {...appendTestMetaData(testMetaData, 'Spinner')} />
          ))
        : icon}

      {!iconOnly && (
        <Typography
          as="span"
          variant="body"
          testMetaData={appendTestMetaData(testMetaData, 'Text')}
        >
          {children}
        </Typography>
      )}
    </Component>
  );
};

Button.displayName = 'Button';
