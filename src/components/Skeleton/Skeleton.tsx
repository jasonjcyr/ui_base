'use client';

import styles from './Skeleton.module.scss';

import { CSSProperties, FC } from 'react';

import clsx from 'clsx';

import { TestMetaData } from '@/interfaceCollection/TestMetaData.interface';

export type SkeletonProps = {
  variant?: 'text' | 'circle' | 'rectangular' | 'inline';
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  className?: string;
  testMetaData?: TestMetaData;
  style?: CSSProperties;
};

export const Skeleton: FC<SkeletonProps> = ({
  variant = 'text',
  width,
  height,
  borderRadius,
  className,
  testMetaData,
  style: userStyle = {},
}) => {
  const mergedStyle: CSSProperties = {
    ...userStyle,
    width: width ?? userStyle.width,
    height: height ?? userStyle.height,
    borderRadius: borderRadius ?? userStyle.borderRadius,
  };

  return (
    <span
      className={clsx(styles.skeleton, styles[variant], className)}
      style={mergedStyle}
      {...testMetaData}
    />
  );
};

Skeleton.displayName = 'Skeleton';
