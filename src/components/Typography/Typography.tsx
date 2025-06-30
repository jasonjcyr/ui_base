import styles from './Typography.module.scss';

import React from 'react';

import clsx from 'clsx';

import { ValidTextColor } from '@/interfaceCollection/Color.type';
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
  | 'overline';

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

  let colorClass = '';
  if (color) {
    colorClass = `text-${color}`;
  }

  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development' && !variantClass) {
    console.warn(`[Typography] Missing SCSS class for variant: typography-${variant}`);
  }

  return (
    <Component
      className={clsx(variantClass, colorClass, className)}
      {...appendTestMetaData(testMetaData, 'Typography')}
      {...rest}
    >
      {children}
    </Component>
  );
};

Typography.displayName = 'Typography';
