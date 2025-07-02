'use client';

import styles from './Label.module.scss';

import clsx from 'clsx';

import { Typography } from '@/components/Typography';
import { TestMetaData } from '@/interfaceCollection/TestMetaData.interface';
import { appendTestMetaData } from '@/tools';

type LabelProps = {
  htmlFor: string;
  children: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  testMetaData?: TestMetaData;
};

export const Label = ({
  htmlFor,
  children,
  required = false,
  disabled = false,
  className,
  testMetaData,
}: LabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className={clsx(
        styles.label,
        {
          [styles.disabled]: disabled,
        },
        className,
      )}
      {...appendTestMetaData(testMetaData, 'Label')}
    >
      <Typography as="span" variant="body">
        {children}
        {required && <span className={styles.required}> *</span>}
      </Typography>
    </label>
  );
};

Label.displayName = 'Label';
