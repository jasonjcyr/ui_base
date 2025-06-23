import { Button } from './Button';
import { describe, expect, it } from '@jest/globals';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { ArrowLeft } from 'lucide-react';

describe('<Button />', () => {
  it('renders with default test id', () => {
    render(<Button testMetaData={{ 'data-testid': 'button-default' }}>Click Me</Button>);
    expect(screen.getByTestId('button-default')).toBeInTheDocument();
  });

  it('renders with icon', () => {
    render(
      <Button icon={<ArrowLeft />} testMetaData={{ 'data-testid': 'button-icon' }}>
        Back
      </Button>,
    );
    expect(screen.getByTestId('button-icon')).toBeInTheDocument();
  });

  it('renders loading spinner when loading', () => {
    render(
      <Button loading testMetaData={{ 'data-testid': 'button-loading' }}>
        Loading...
      </Button>,
    );

    expect(screen.getByTestId('button-loading12')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
