'use client';

import styles from './Toggle.module.scss';

import { InputHTMLAttributes, forwardRef } from 'react';

import clsx from 'clsx';

import { Label } from '@/components/Label';
import { Typography } from '@/components/Typography';
import { TestMetaData } from '@/interfaceCollection/TestMetaData.interface';
import { appendTestMetaData } from '@/tools/testMetaData';

export interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  id: string;
  label?: string;
  helperText?: string;
  error?: string;
  fullWidth?: boolean;
  required?: boolean;
  testMetaData?: TestMetaData;
}

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  ({ id, label, helperText, error, fullWidth = false, required, testMetaData, ...props }, ref) => {
    const hasError = Boolean(error);
    const describedById = helperText || error ? `${id}-help` : undefined;

    return (
      <div
        className={clsx(styles.wrapper, { [styles['full-width']]: fullWidth })}
        {...testMetaData}
      >
        <div className={styles.header}>
          <label htmlFor={id} className={styles.switch}>
            <input
              id={id}
              ref={ref}
              type="checkbox"
              className={styles.input}
              aria-invalid={hasError}
              aria-describedby={describedById}
              required={required}
              {...props}
            />
            <span className={styles.slider} />
          </label>

          {label && (
            <Label
              htmlFor={id}
              required={required}
              error={hasError}
              testMetaData={appendTestMetaData(testMetaData, 'Label')}
            >
              {label}
            </Label>
          )}
        </div>

        {(helperText || hasError) && (
          <Typography
            as="p"
            id={describedById}
            variant={hasError ? 'error' : 'caption'}
            testMetaData={appendTestMetaData(testMetaData, hasError ? 'Error' : 'Helper')}
          >
            {hasError ? error : helperText}
          </Typography>
        )}
      </div>
    );
  },
);

Toggle.displayName = 'Toggle';
