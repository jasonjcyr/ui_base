'use client';

import styles from './Radio.module.scss';

import { ChangeEvent } from 'react';

import clsx from 'clsx';

import { Typography } from '@/components/Typography';
import { TestMetaData } from '@/interfaceCollection/TestMetaData.interface';
import { appendTestMetaData } from '@/tools';

type RadioProps = {
  id: string;
  label: string;
  name: string;
  value: string;
  checked: boolean;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  testMetaData?: TestMetaData;
};

export const Radio = ({
  id,
  label,
  name,
  value,
  checked,
  disabled = false,
  error = false,
  helperText,
  onChange,
  testMetaData,
}: RadioProps) => {
  const meta = appendTestMetaData(testMetaData, 'Radio');

  return (
    <div className={styles.wrapper}>
      <label htmlFor={id} className={clsx(styles.label, { [styles.disabled]: disabled })}>
        <input
          type="radio"
          id={id}
          name={name}
          value={value}
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          className={clsx(styles.input, { [styles.error]: error })}
          {...meta}
        />
        <span className={styles.control} aria-hidden="true" />
        <Typography as="span" variant="body">
          {label}
        </Typography>
      </label>
      {helperText && (
        <Typography
          variant="caption"
          className={clsx(styles.helperText, { [styles.error]: error })}
        >
          {helperText}
        </Typography>
      )}
    </div>
  );
};

Radio.displayName = 'Radio';
