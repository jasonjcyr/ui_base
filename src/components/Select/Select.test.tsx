'use client';

import { Select, SelectProps } from './Select';
import { fireEvent, render, screen } from '@testing-library/react';

import React from 'react';

const defaultProps: SelectProps = {
  id: 'fruit',
  label: 'Favorite Fruit',
  value: '',
  placeholder: 'Select a fruit...',
  onChange: jest.fn(),
  options: [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
  ],
};

describe('Select', () => {
  it('renders the label', () => {
    render(<Select {...defaultProps} />);
    expect(screen.getByLabelText('Favorite Fruit')).toBeInTheDocument();
  });

  it('renders all options and placeholder', () => {
    render(<Select {...defaultProps} />);
    expect(screen.getByText('Select a fruit...')).toBeInTheDocument();
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('Banana')).toBeInTheDocument();
  });

  it('triggers onChange and updates value', () => {
    const Wrapper = () => {
      const [value, setValue] = React.useState('');
      return <Select {...defaultProps} value={value} onChange={(e) => setValue(e.target.value)} />;
    };

    render(<Wrapper />);
    const select = screen.getByLabelText('Favorite Fruit') as HTMLSelectElement;
    fireEvent.change(select, { target: { value: 'banana' } });

    expect(select.value).toBe('banana');
  });

  it('renders helper text when provided', () => {
    render(<Select {...defaultProps} helperText="Pick your favorite fruit" />);
    expect(screen.getByText('Pick your favorite fruit')).toBeInTheDocument();
  });

  it('is disabled when disabled is true', () => {
    render(<Select {...defaultProps} disabled />);
    expect(screen.getByLabelText('Favorite Fruit')).toBeDisabled();
  });

  it('applies custom className to select wrapper', () => {
    render(<Select {...defaultProps} className="custom-class" />);
    const wrapper = screen.getByLabelText('Favorite Fruit').parentElement;
    expect(wrapper?.className).toContain('custom-class');
  });

  it('supports test metadata props', () => {
    render(
      <Select
        {...defaultProps}
        testMetadata={{
          'data-testid': 'fruit-select',
          'data-uitest': 'fruit-select-ui',
        }}
      />,
    );
    const wrapper = screen.getByTestId('fruit-select');
    expect(wrapper).toHaveAttribute('data-uitest', 'fruit-select-ui');
  });

  it('renders correctly with a selected value', () => {
    render(<Select {...defaultProps} value="banana" onChange={jest.fn()} />);
    const select = screen.getByLabelText('Favorite Fruit') as HTMLSelectElement;
    expect(select.value).toBe('banana');
  });

  it('renders without crashing when no label is provided', () => {
    render(<Select {...defaultProps} label={undefined} value="apple" onChange={jest.fn()} />);
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
  });
});
