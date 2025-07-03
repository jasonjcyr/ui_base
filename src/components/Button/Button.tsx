'use client';

import styles from './Button.module.scss';

import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

import clsx from 'clsx';

import { Typography } from '@/components/Typography';
import { TestMetaData } from '@/interfaceCollection/TestMetaData.interface';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'xl' | 'lg' | 'md' | 'sm';

export type BaseProps<C extends ElementType> = {
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

  const rootMeta = {
    ...testMetaData,
    'data-testid': testMetaData?.['data-testid']
      ? `${testMetaData['data-testid']}-Button`
      : undefined,
    'data-uitest': testMetaData?.['data-uitest']
      ? `${testMetaData['data-uitest']}-Button`
      : undefined,
  };

  const spinnerMeta = {
    ...testMetaData,
    'data-testid': testMetaData?.['data-testid']
      ? `${testMetaData['data-testid']}-Spinner`
      : undefined,
    'data-uitest': testMetaData?.['data-uitest']
      ? `${testMetaData['data-uitest']}-Spinner`
      : undefined,
  };

  const textMeta = {
    ...testMetaData,
    'data-testid': testMetaData?.['data-testid']
      ? `${testMetaData['data-testid']}-Text`
      : undefined,
    'data-uitest': testMetaData?.['data-uitest']
      ? `${testMetaData['data-uitest']}-Text`
      : undefined,
  };

  return (
    <Component
      className={buttonClasses}
      {...(isAnchor ? { 'aria-disabled': isDisabled } : { disabled: isDisabled })}
      {...rootMeta}
      {...props}
      {...testMetaData}
    >
      {loading ? (spinner ?? <span className={styles.spinner} {...spinnerMeta} />) : icon}
      {!iconOnly && (
        <Typography as="span" variant="body" {...textMeta}>
          {children}
        </Typography>
      )}
    </Component>
  );
};

Button.displayName = 'Button';
