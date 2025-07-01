import { Button } from './Button';
import { describe, expect, it } from '@jest/globals';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import Link from 'next/link';

import { ArrowLeft } from 'lucide-react';

describe('<Button />', () => {
  it('renders with testMetaData and default props', () => {
    render(<Button testMetaData={{ 'data-testid': 'button-default' }}>Click Me</Button>);
    expect(screen.getByTestId('button-default-Button')).toBeInTheDocument();
    expect(screen.getByTestId('button-default-Text-Typography')).toHaveTextContent('Click Me');
  });

  it('renders with an icon', () => {
    render(
      <Button icon={<ArrowLeft />} testMetaData={{ 'data-testid': 'button-icon' }}>
        Back
      </Button>,
    );
    expect(screen.getByTestId('button-icon-Button')).toBeInTheDocument();
    expect(screen.getByTestId('button-icon-Text-Typography')).toHaveTextContent('Back');
  });

  it('renders loading spinner when loading', () => {
    render(
      <Button loading testMetaData={{ 'data-testid': 'button-loading' }}>
        Loading...
      </Button>,
    );
    const button = screen.getByTestId('button-loading-Button');
    expect(button).toBeDisabled();
    expect(screen.getByTestId('button-loading-Spinner')).toBeInTheDocument();
    expect(screen.getByTestId('button-loading-Text-Typography')).toHaveTextContent('Loading...');
  });

  it('renders with custom spinner', () => {
    const CustomSpinner = <span data-testid="custom-spinner">Loading...</span>;
    render(
      <Button loading spinner={CustomSpinner} testMetaData={{ 'data-testid': 'button-spinner' }}>
        With Custom Spinner
      </Button>,
    );
    expect(screen.getByTestId('button-spinner-Button')).toBeInTheDocument();
    expect(screen.getByTestId('custom-spinner')).toBeInTheDocument();
  });

  it('renders iconOnly button', () => {
    render(
      <Button
        iconOnly
        icon={<ArrowLeft />}
        children=""
        testMetaData={{ 'data-testid': 'button-icon-only' }}
        aria-label="Back"
      />,
    );
    expect(screen.getByTestId('button-icon-only-Button')).toBeInTheDocument();
  });

  it('renders destructive variant', () => {
    render(
      <Button variant="primary" destructive testMetaData={{ 'data-testid': 'button-destructive' }}>
        Delete
      </Button>,
    );
    expect(screen.getByTestId('button-destructive-Button')).toBeInTheDocument();
    expect(screen.getByTestId('button-destructive-Text-Typography')).toHaveTextContent('Delete');
  });

  it('renders as native anchor tag', () => {
    render(
      <Button as="a" href="https://example.com" testMetaData={{ 'data-testid': 'button-anchor' }}>
        External Link
      </Button>,
    );
    const anchor = screen.getByTestId('button-anchor-Button');
    expect(anchor).toBeInTheDocument();
    expect(anchor).toHaveAttribute('href', 'https://example.com');
    expect(screen.getByTestId('button-anchor-Text-Typography')).toHaveTextContent('External Link');
  });

  it('renders as Next.js Link', () => {
    render(
      <Button as={Link} href="/about" testMetaData={{ 'data-testid': 'button-link' }}>
        About Us
      </Button>,
    );
    const link = screen.getByTestId('button-link-Button');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/about');
    expect(screen.getByTestId('button-link-Text-Typography')).toHaveTextContent('About Us');
  });

  it('respects disabled=true', () => {
    render(
      <Button disabled testMetaData={{ 'data-testid': 'button-disabled' }}>
        Disabled
      </Button>,
    );
    const button = screen.getByTestId('button-disabled-Button');
    expect(button).toBeDisabled();
    expect(screen.getByTestId('button-disabled-Text-Typography')).toHaveTextContent('Disabled');
  });
});
