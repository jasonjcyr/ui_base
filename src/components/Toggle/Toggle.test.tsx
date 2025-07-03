import { Toggle } from './Toggle';
import { fireEvent, render, screen } from '@testing-library/react';

describe('<Toggle />', () => {
  it('renders with label and default state', () => {
    render(
      <Toggle
        id="test-toggle"
        label="Enable feature"
        testMetaData={{ 'data-testid': 'toggle-test' }}
      />,
    );

    expect(screen.getByLabelText('Enable feature')).toBeInTheDocument();
    expect(screen.getByTestId('toggle-test-Toggle')).toBeInTheDocument();
    expect(screen.getByTestId('toggle-test-Label')).toBeInTheDocument();
  });

  it('renders helper text using Typography', () => {
    render(
      <Toggle
        id="toggle-helper"
        label="With helper"
        helperText="Some helpful info"
        testMetaData={{ 'data-testid': 'toggle-helper' }}
      />,
    );

    expect(screen.getByText('Some helpful info')).toBeInTheDocument();
    expect(screen.getByTestId('toggle-helper-Helper')).toBeInTheDocument();
  });

  it('renders error message using Typography', () => {
    render(
      <Toggle
        id="toggle-error"
        label="With error"
        error="This is an error"
        testMetaData={{ 'data-testid': 'toggle-error' }}
      />,
    );

    expect(screen.getByText('This is an error')).toBeInTheDocument();
    expect(screen.getByTestId('toggle-error-Error')).toBeInTheDocument();
  });

  it('triggers onChange when toggled', () => {
    const handleChange = jest.fn();
    render(
      <Toggle
        id="toggle-onchange"
        label="Toggle me"
        onChange={handleChange}
        testMetaData={{ 'data-testid': 'toggle-onchange' }}
      />,
    );

    fireEvent.click(screen.getByRole('checkbox'));
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(
      <Toggle
        id="toggle-disabled"
        label="Disabled toggle"
        disabled
        testMetaData={{ 'data-testid': 'toggle-disabled' }}
      />,
    );

    expect(screen.getByRole('checkbox')).toBeDisabled();
  });
});
