'use client';

import styles from './Typography.module.scss';

import type React from 'react';

import clsx from 'clsx';

import { ValidTextColor } from '@/interfaceCollection';
import { TestMetaData } from '@/interfaceCollection/TestMetaData.interface';
import { appendTestMetaData } from '@/tools/testMetaData';

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
  | 'overline'
  | 'error';

type TypographyProps<Tag extends React.ElementType = 'p'> = {
  as?: Tag;
  variant?: PredefinedVariant;
  color?: ValidTextColor;
  className?: string;
  children: React.ReactNode;
  testMetaData?: TestMetaData;
} & Omit<React.ComponentPropsWithoutRef<Tag>, 'as' | 'children' | 'className'>;

export const Typography = <Tag extends React.ElementType = 'p'>({
  as,
  variant = 'body',
  color,
  children,
  className,
  testMetaData,
  ...rest
}: TypographyProps<Tag>) => {
  const inferredTag = variant.startsWith('h') ? variant : 'p';
  const Component = (as ?? inferredTag) as React.ElementType;

  const variantClass = styles[`typography-${variant}`];

  if (process.env.NODE_ENV === 'development' && !variantClass) {
    console.warn(`[Typography] Missing SCSS class for variant: typography-${variant}`);
  }

  const style = color
    ? { '--text-color': `var(--color-${color})`, color: 'var(--text-color)' }
    : undefined;

  return (
    <Component {...testMetaData} className={clsx(variantClass, className)} style={style} {...rest}>
      {children}
    </Component>
  );
};
