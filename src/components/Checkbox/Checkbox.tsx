'use client';

import styles from './Checkbox.module.scss';

import React from 'react';

import clsx from 'clsx';

import { Label } from '@/components/Label';
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
  required?: boolean;
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
  required,
  testMetaData,
}: CheckboxProps) => {
  const showError = Boolean(errorText);
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
            id={id}
            type="checkbox"
            className={clsx(styles.input, { [styles.error]: showError })}
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            aria-describedby={describedById}
            aria-invalid={showError || undefined}
            required={required}
            {...appendTestMetaData(testMetaData, 'Checkbox')}
          />
          <span className={clsx(styles.box, { [styles.errorBox]: showError })} aria-hidden="true" />
          <Typography
            as="span"
            variant="body"
            className={styles.labelText}
            {...appendTestMetaData(testMetaData, 'CheckboxHlpLbl')}
          >
            {label}
          </Typography>
        </div>
      </Label>

      {(helperText || errorText) && (
        <Typography
          as="p"
          variant={showError ? 'error' : 'caption'}
          id={describedById}
          role={showError ? 'alert' : undefined}
          {...appendTestMetaData(testMetaData, 'CheckboxHlpTxt')}
        >
          {showError ? errorText : helperText}
        </Typography>
      )}
    </div>
  );
};
