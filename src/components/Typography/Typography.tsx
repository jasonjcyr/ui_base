import styles from './Typography.module.scss';

import React, { JSX } from 'react';

import clsx from 'clsx';

type Variant = 'h1' | 'h2' | 'body' | 'caption';

type TypographyProps = {
  as?: keyof JSX.IntrinsicElements;
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
};

export const Typography = ({
  as = 'p',
  variant = 'body',
  children,
  className,
}: TypographyProps) => {
  const Tag = as;
  return <Tag className={clsx(styles[`typography-${variant}`], className)}>{children}</Tag>;
};
