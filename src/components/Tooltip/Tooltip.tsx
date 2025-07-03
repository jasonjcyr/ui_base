'use client';

import styles from './Tooltip.module.scss';

import { ReactNode } from 'react';

import clsx from 'clsx';

import { TestMetaData } from '@/interfaceCollection/TestMetaData.interface';

export interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  position?: 'top' | 'right' | 'bottom' | 'left';
  className?: string;
  testMetaData?: TestMetaData;
}

export const Tooltip = ({
  content,
  children,
  position = 'top',
  className,
  testMetaData,
}: TooltipProps) => {
  return (
    <div className={clsx(styles.wrapper, styles[position], className)} {...testMetaData}>
      {children}
      <span className={styles.tooltip}>{content}</span>
    </div>
  );
};

Tooltip.displayName = 'Tooltip';
