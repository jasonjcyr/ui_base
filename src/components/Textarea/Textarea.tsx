'use client';

import styles from './Textarea.module.scss';

import { TextareaHTMLAttributes, forwardRef } from 'react';

import clsx from 'clsx';

import { Label } from '@/components/Label';
import { Typography } from '@/components/Typography';
import { TestMetaData } from '@/interfaceCollection/TestMetaData.interface';
import { appendTestMetaData } from '@/tools/testMetaData';

export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  id: string;
  label?: string;
  helperText?: string;
  error?: string;
  fullWidth?: boolean;
  className?: string;
  required?: boolean;
  testMetaData?: TestMetaData;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      id,
      label,
      helperText,
      error,
      fullWidth = false,
      className,
      required,
      testMetaData,
      ...props
    },
    ref,
  ) => {
    const hasError = Boolean(error);
    const describedById = helperText || error ? `${id}-help` : undefined;

    return (
      <div
        className={clsx(styles.wrapper, { [styles['full-width']]: fullWidth })}
        {...appendTestMetaData(testMetaData, 'Textarea')}
      >
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

        <div className={clsx(styles.textareaWrapper, { [styles.error]: hasError })}>
          <textarea
            id={id}
            ref={ref}
            className={clsx(styles.textarea, className)}
            aria-invalid={hasError}
            aria-describedby={describedById}
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

Textarea.displayName = 'Textarea';
