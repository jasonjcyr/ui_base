import styles from './Typography.module.scss';

import React from 'react';

import clsx from 'clsx';

type PredefinedVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body'
  | 'caption'
  | 'lead'
  | 'overline';

type TestMetadata = {
  'data-testid'?: string;
  'data-uitest'?: string;
};

type TypographyProps<Tag extends React.ElementType = 'p'> = {
  as?: Tag;
  variant?: PredefinedVariant;
  className?: string;
  children: React.ReactNode;
  testMetadata?: TestMetadata;
} & Omit<React.ComponentPropsWithoutRef<Tag>, 'as' | 'children' | 'className'>;

export const Typography = <Tag extends React.ElementType = 'p'>({
  as,
  variant = 'body',
  children,
  className,
  testMetadata,
  ...rest
}: TypographyProps<Tag>) => {
  const inferredTag = variant.startsWith('h') ? variant : 'p';
  const Component = (as ?? inferredTag) as React.ElementType;

  const variantClass = styles[`typography-${variant}`];

  if (process.env.NODE_ENV === 'development' && !variantClass) {
    console.warn(`[Typography] Missing SCSS class for variant: typography-${variant}`);
  }

  return (
    <Component className={clsx(variantClass, className)} {...testMetadata} {...rest}>
      {children}
    </Component>
  );
};

Typography.displayName = 'Typography';
