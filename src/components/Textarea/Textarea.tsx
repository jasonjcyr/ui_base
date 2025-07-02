'use client';

import styles from './Textarea.module.scss';

import { TextareaHTMLAttributes, forwardRef } from 'react';

import clsx from 'clsx';

export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  id: string;
  label?: string;
  helperText?: string;
  error?: boolean;
  fullWidth?: boolean;
  className?: string;
  testMetadata?: {
    'data-testid'?: string;
    'data-uitest'?: string;
  };
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { id, label, helperText, error = false, fullWidth = false, className, testMetadata, ...props },
    ref,
  ) => {
    return (
      <div
        className={clsx(styles.wrapper, { [styles['full-width']]: fullWidth })}
        {...testMetadata}
      >
        {label && (
          <label htmlFor={id} className={styles.label}>
            {label}
          </label>
        )}
        <div className={clsx(styles.textareaWrapper, { [styles.error]: error })}>
          <textarea
            id={id}
            ref={ref}
            className={clsx(styles.textarea, className)}
            aria-invalid={error}
            aria-describedby={helperText ? `${id}-help` : undefined}
            {...props}
          />
        </div>
        {helperText && (
          <p id={`${id}-help`} className={clsx(styles.helperText, { [styles.errorText]: error })}>
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';
