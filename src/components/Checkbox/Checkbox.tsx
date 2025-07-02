'use client';

import styles from './Checkbox.module.scss';

import React from 'react';

import clsx from 'clsx';

import { Typography } from '@/components/Typography';
import { TestMetaData } from '@/interfaceCollection/TestMetaData.interface';
import { appendTestMetaData } from '@/tools/testMetaData';

type CheckboxProps = {
  id: string;
  label: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  helperText?: string;
  errorText?: string;
  testMetaData?: TestMetaData;
};

export const Checkbox = ({
  id,
  label,
  checked,
  onChange,
  disabled = false,
  helperText,
  errorText,
  testMetaData,
}: CheckboxProps) => {
  const showError = Boolean(errorText);
  const describedById = showError ? `${id}-error` : helperText ? `${id}-helper` : undefined;

  return (
    <div className={styles.wrapper}>
      <label htmlFor={id} className={clsx(styles.label, { [styles.disabled]: disabled })}>
        <input
          id={id}
          type="checkbox"
          className={clsx(styles.input, { [styles.error]: showError })}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          aria-describedby={describedById}
          aria-invalid={showError || undefined}
          {...appendTestMetaData(testMetaData, 'Checkbox')}
        />
        <span className={styles.box} aria-hidden="true" />
        <Typography as="span" variant="body">
          {label}
        </Typography>
      </label>

      {(helperText || errorText) && (
        <Typography
          as="p"
          variant="caption"
          className={clsx(styles.helperText, { [styles.errorText]: showError })}
          id={describedById}
          role={showError ? 'alert' : undefined}
        >
          {showError ? errorText : helperText}
        </Typography>
      )}
    </div>
  );
};
