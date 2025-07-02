'use client';

import styles from './Select.module.scss';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ChangeEvent, FC } from 'react';

import clsx from 'clsx';

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps {
  id: string;
  name?: string;
  label?: string;
  value: string;
  options: SelectOption[];
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
  className?: string;
  helperText?: string;
  testMetadata?: {
    'data-testid'?: string;
    'data-uitest'?: string;
  };
}

export const Select: FC<SelectProps> = ({
  id,
  name,
  label,
  value,
  options,
  placeholder,
  onChange,
  disabled = false,
  className,
  helperText,
  testMetadata,
}) => {
  return (
    <div className={clsx(styles.wrapper)} {...testMetadata}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}

      <div className={clsx(styles.selectWrapper, className)}>
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={styles.select}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {options.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <FontAwesomeIcon icon={faChevronDown} className={styles.icon} />
      </div>

      {helperText && <p className={styles.helperText}>{helperText}</p>}
    </div>
  );
};

Select.displayName = 'Select';
