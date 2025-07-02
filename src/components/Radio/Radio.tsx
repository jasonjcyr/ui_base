'use client';

import styles from './Radio.module.scss';

import { ChangeEvent } from 'react';

import clsx from 'clsx';

import { Label } from '@/components/Label';
import { Typography } from '@/components/Typography';
import { TestMetaData } from '@/interfaceCollection/TestMetaData.interface';
import { appendTestMetaData } from '@/tools/testMetaData';

type RadioProps = {
  id: string;
  label: string;
  name: string;
  value: string;
  checked: boolean;
  disabled?: boolean;
  error?: boolean;
  required?: boolean;
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
  required = false,
  helperText,
  onChange,
  testMetaData,
}: RadioProps) => {
  const showError = Boolean(error);
  const describedById = showError ? `${id}-error` : helperText ? `${id}-helper` : undefined;

  return (
    <div className={styles.wrapper}>
      <Label
        htmlFor={id}
        disabled={disabled}
        required={required}
        error={showError}
        {...testMetaData}
      >
        <div className={styles.inputWrapper}>
          <input
            type="radio"
            id={id}
            name={name}
            value={value}
            checked={checked}
            disabled={disabled}
            onChange={onChange}
            aria-invalid={showError || undefined}
            aria-describedby={describedById}
            required={required}
            className={clsx(styles.input, { [styles.error]: showError })}
            {...appendTestMetaData(testMetaData, 'Radio')}
          />
          <span
            className={clsx(styles.control, { [styles.errorControl]: showError })}
            aria-hidden="true"
          />
          <Typography as="span" variant="body" className={styles.labelText}>
            {label}
          </Typography>
        </div>
      </Label>

      {(helperText || showError) && (
        <Typography
          as="p"
          id={describedById}
          role={showError ? 'alert' : undefined}
          variant={showError ? 'error' : 'caption'}
        >
          {showError ? 'This field is required' : helperText}
        </Typography>
      )}
    </div>
  );
};

Radio.displayName = 'Radio';
