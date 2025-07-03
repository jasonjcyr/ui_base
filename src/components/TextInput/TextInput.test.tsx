import { TextInput } from './TextInput';
import { fireEvent, render, screen } from '@testing-library/react';

import React from 'react';

describe('TextInput', () => {
  it('renders with a label and input', () => {
    render(<TextInput label="Name" />);
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
  });

  it('renders helper text when provided', () => {
    render(<TextInput helperText="This is a helper" label="Email" />);
    expect(screen.getByText('This is a helper')).toBeInTheDocument();
  });

  it('renders error text when error is provided', () => {
    render(<TextInput error="This is an error" label="Email" />);
    expect(screen.getByText('This is an error')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toHaveAttribute('aria-invalid', 'true');
  });

  it('adds icon if provided', () => {
    render(<TextInput label="Search" icon={<span data-testid="icon">🔍</span>} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('spreads additional input props', () => {
    render(<TextInput label="Username" placeholder="Enter username" />);
    expect(screen.getByPlaceholderText('Enter username')).toBeInTheDocument();
  });

  it('applies fullWidth class if true', () => {
    const { container } = render(<TextInput fullWidth label="Email" />);
    expect(container.firstChild).toHaveClass('full-width');
  });

  it('uses default input id if not provided', () => {
    render(<TextInput label="First Name" />);
    const input = screen.getByLabelText('First Name');
    expect(input).toHaveAttribute('id');
  });

  it('uses provided input id if given', () => {
    render(<TextInput label="Last Name" id="last-name" />);
    expect(screen.getByLabelText('Last Name')).toHaveAttribute('id', 'last-name');
  });

  it('shows helper text with id for aria-describedby', () => {
    render(<TextInput label="Username" helperText="Must be unique" />);
    const input = screen.getByLabelText('Username');
    const descriptionId = input.getAttribute('aria-describedby');
    expect(screen.getByText('Must be unique').id).toBe(descriptionId);
  });

  it('applies test metadata correctly', () => {
    const { container } = render(
      <TextInput
        label="User"
        testMetaData={{ 'data-testid': 'input-test', 'data-uitest': 'input-ui' }}
      />,
    );
    expect(container.firstChild).toHaveAttribute('data-testid', 'input-test');
    expect(container.firstChild).toHaveAttribute('data-uitest', 'input-ui');
  });

  it('can be controlled', () => {
    const handleChange = jest.fn();
    render(
      <TextInput
        value="initial"
        onChange={handleChange}
        label="Email"
        testMetaData={{ 'data-testid': 'email-input' }}
      />,
    );
    const input = screen.getByLabelText('Email') as HTMLInputElement;
    expect(input.value).toBe('initial');
    fireEvent.change(input, { target: { value: 'changed' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('supports refs', () => {
    const TestWrapper = () => {
      const inputRef = React.useRef<HTMLInputElement>(null);
      return <TextInput label="Test" ref={inputRef} />;
    };
    render(<TestWrapper />);
    expect(screen.getByLabelText('Test')).toBeInTheDocument();
  });
});
