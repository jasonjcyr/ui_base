import { Button } from './Button';
import { describe, expect, it } from '@jest/globals';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { ArrowLeft } from 'lucide-react';

describe('<Button />', () => {
  it('renders with default props', () => {
    render(<Button testMetaData={{ 'data-testid': 'btn-default' }}>Click</Button>);
    expect(screen.getByTestId('btn-default-Button')).toBeInTheDocument();
  });

  it('shows loading spinner when loading', () => {
    render(
      <Button loading testMetaData={{ 'data-testid': 'btn-loading' }}>
        Load
      </Button>,
    );
    expect(screen.getByTestId('btn-loading-Spinner')).toBeInTheDocument();
  });

  it('renders icon only', () => {
    render(
      <Button
        iconOnly
        icon={<ArrowLeft />}
        testMetaData={{ 'data-testid': 'btn-icon' }}
        aria-label="Icon button"
      />,
    );
    expect(screen.getByTestId('btn-icon-Button')).toBeInTheDocument();
  });

  it('renders as anchor', () => {
    render(
      <Button as="a" href="https://example.com" testMetaData={{ 'data-testid': 'btn-anchor' }}>
        Link
      </Button>,
    );
    const link = screen.getByTestId('btn-anchor-Button');
    expect(link).toHaveAttribute('href', 'https://example.com');
  });
});
