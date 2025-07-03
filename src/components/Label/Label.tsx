'use client';

import styles from './Label.module.scss';

import { ComponentPropsWithRef, ElementType, ReactNode, forwardRef } from 'react';

import clsx from 'clsx';

import { TestMetaData } from '@/interfaceCollection/TestMetaData.interface';
import { appendTestMetaData } from '@/tools/testMetaData';

type LabelBaseProps = {
  as?: ElementType;
  htmlFor?: string;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  children: ReactNode;
  className?: string;
  testMetaData?: TestMetaData;
};

export const Label = forwardRef<HTMLElement, LabelBaseProps & ComponentPropsWithRef<'label'>>(
  (
    {
      as: Component = 'label',
      htmlFor,
      disabled = false,
      required = false,
      error = false,
      children,
      className,
      testMetaData,
      ...props
    },
    ref,
  ) => {
    return (
      <Component
        ref={ref}
        htmlFor={htmlFor}
        className={clsx(
          styles.label,
          {
            [styles.disabled]: disabled,
            [styles.error]: error, // ✅ CONDITIONAL CLASS
          },
          className,
        )}
        {...testMetaData}
        {...props}
      >
        {children}
        {required && (
          <span aria-hidden="true" className={styles.required}>
            *
          </span>
        )}
      </Component>
    );
  },
);

Label.displayName = 'Label';
