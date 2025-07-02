'use client';

import styles from './TextInput.module.scss';

import { InputHTMLAttributes, ReactNode, forwardRef } from 'react';

import clsx from 'clsx';

import { Label } from '@/components/Label';
import { Typography } from '@/components/Typography';
import { TestMetaData } from '@/interfaceCollection/TestMetaData.interface';
import { appendTestMetaData } from '@/tools';

export interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: ReactNode;
  fullWidth?: boolean;
  required?: boolean;
  testMetaData?: TestMetaData;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    { id, label, error, helperText, icon, className, fullWidth, required, testMetaData, ...props },
    ref,
  ) => {
    const inputId = id || `textinput-${Math.random().toString(36).slice(2, 9)}`;
    const hasError = Boolean(error);
    const describedById = helperText || error ? `${inputId}-help` : undefined;

    return (
      <div
        className={clsx(styles.wrapper, { [styles['full-width']]: fullWidth })}
        {...testMetaData}
      >
        {label && (
          <Label
            htmlFor={inputId}
            required={required}
            error={hasError}
            testMetaData={appendTestMetaData(testMetaData, 'Label')}
          >
            {label}
          </Label>
        )}

        <div
          className={clsx(styles.inputWrapper, {
            [styles.error]: hasError,
            [styles.withIcon]: icon,
          })}
        >
          {icon && <span className={styles.icon}>{icon}</span>}
          <input
            id={inputId}
            ref={ref}
            aria-invalid={hasError}
            aria-describedby={describedById}
            className={clsx(styles.input, className)}
            required={required}
            {...props}
          />
        </div>

        {(helperText || hasError) && (
          <Typography as="p" id={describedById} variant={hasError ? 'error' : 'caption'}>
            {hasError ? error : helperText}
          </Typography>
        )}
      </div>
    );
  },
);

TextInput.displayName = 'TextInput';
