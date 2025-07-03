'use client';

import styles from './Card.module.scss';

import { FC, ReactNode } from 'react';

import clsx from 'clsx';

import { Label } from '@/components/Label';
import { TestMetaData } from '@/interfaceCollection/TestMetaData.interface';
import { appendTestMetaData } from '@/tools/testMetaData';

export type CardProps = {
  label?: string;
  elevation?: 'none' | 'sm' | 'md' | 'lg';
  interactive?: boolean;
  className?: string;
  children: ReactNode;
  imageUrl?: string;
  imageAlt?: string;
  testMetaData?: TestMetaData;
};

type SectionProps = {
  children: ReactNode;
  className?: string;
  testMetaData?: TestMetaData;
};

const CardHeader: FC<SectionProps> = ({ children, className, testMetaData }) => {
  const meta = appendTestMetaData(testMetaData, 'Header');
  return (
    <div className={clsx(styles.header, className)} {...meta}>
      {children}
    </div>
  );
};
CardHeader.displayName = 'Card.Header';

const CardBody: FC<SectionProps> = ({ children, className, testMetaData }) => {
  const meta = appendTestMetaData(testMetaData, 'Body');
  return (
    <div className={clsx(styles.body, className)} {...meta}>
      {children}
    </div>
  );
};
CardBody.displayName = 'Card.Body';

const CardFooter: FC<SectionProps> = ({ children, className, testMetaData }) => {
  const meta = appendTestMetaData(testMetaData, 'Footer');
  return (
    <div className={clsx(styles.footer, className)} {...meta}>
      {children}
    </div>
  );
};
CardFooter.displayName = 'Card.Footer';

export const Card: FC<CardProps> & {
  Header: typeof CardHeader;
  Body: typeof CardBody;
  Footer: typeof CardFooter;
} = ({
  label,
  elevation = 'md',
  interactive = false,
  className,
  imageUrl,
  imageAlt = '',
  children,
  testMetaData,
}) => {
  const labelMeta = appendTestMetaData(testMetaData, 'Label');
  const imageMeta = appendTestMetaData(testMetaData, 'Image');

  return (
    <div
      className={clsx(
        styles.card,
        styles[`elevation-${elevation}`],
        { [styles.interactive]: interactive },
        className,
      )}
      {...testMetaData}
    >
      {imageUrl && (
        <div className={styles.imageWrapper}>
          <img className={styles.image} src={imageUrl} alt={imageAlt} {...imageMeta} />
        </div>
      )}
      {label && (
        <Label className={styles.label} {...labelMeta}>
          {label}
        </Label>
      )}
      {children}
    </div>
  );
};

Card.displayName = 'Card';
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;
