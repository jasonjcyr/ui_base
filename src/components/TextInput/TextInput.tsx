'use client';

import styles from './TextInput.module.scss';

import { InputHTMLAttributes, ReactNode, forwardRef } from 'react';

import clsx from 'clsx';

import { Typography } from '@/components/Typography';
import { TestMetaData } from '@/interfaceCollection/TestMetaData.interface';
import { appendTestMetaData } from '@/tools';

export interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: ReactNode;
  fullWidth?: boolean;
  testMetaData?: TestMetaData;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ id, label, error, helperText, icon, className, fullWidth, testMetaData, ...props }, ref) => {
    const inputId = id || `textinput-${Math.random().toString(36).slice(2, 9)}`;
    const hasError = Boolean(error);
    const meta = appendTestMetaData(testMetaData, 'TextInput');

    return (
      <div className={clsx(styles.wrapper, { [styles['full-width']]: fullWidth })} {...meta}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
          </label>
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
            aria-describedby={helperText || error ? `${inputId}-help` : undefined}
            className={clsx(styles.input, className)}
            {...props}
          />
        </div>
        {(helperText || error) && (
          <Typography
            as="span"
            variant="caption"
            className={clsx(styles.helperText, {
              [styles.errorText]: hasError,
            })}
            id={`${inputId}-help`}
          >
            {error || helperText}
          </Typography>
        )}
      </div>
    );
  },
);

TextInput.displayName = 'TextInput';
