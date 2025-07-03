'use client';

import { Card } from './Card';
import { render, screen } from '@testing-library/react';

import { Button } from '@/components/Button';

describe('<Card />', () => {
  const baseTestId = 'test-card';

  it('renders card with label, image, and all sections using testMetaData', () => {
    render(
      <Card
        label="Test Label"
        imageUrl="https://example.com/image.jpg"
        imageAlt="Test Image"
        elevation="md"
        interactive
        testMetaData={{ 'data-testid': baseTestId }}
      >
        <Card.Header testMetaData={{ 'data-testid': baseTestId }}>Test Header</Card.Header>
        <Card.Body testMetaData={{ 'data-testid': baseTestId }}>Test Body Content</Card.Body>
        <Card.Footer testMetaData={{ 'data-testid': baseTestId }}>
          <Button variant="primary" size="md">
            Click Me
          </Button>
        </Card.Footer>
      </Card>,
    );

    // Core container
    expect(screen.getByTestId(`${baseTestId}`)).toBeInTheDocument();

    // Image
    const image = screen.getByTestId(`${baseTestId}-Image`);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
    expect(image).toHaveAttribute('alt', 'Test Image');

    // Label
    expect(screen.getByTestId(`${baseTestId}-Label`)).toHaveTextContent('Test Label');

    // Header
    expect(screen.getByTestId(`${baseTestId}-Header`)).toHaveTextContent('Test Header');

    // Body
    expect(screen.getByTestId(`${baseTestId}-Body`)).toHaveTextContent('Test Body Content');

    // Footer
    expect(screen.getByTestId(`${baseTestId}-Footer`)).toContainElement(
      screen.getByRole('button', { name: /click me/i }),
    );
  });

  it('does not render image or label if props are not provided', () => {
    render(
      <Card testMetaData={{ 'data-testid': baseTestId }}>
        <Card.Body testMetaData={{ 'data-testid': baseTestId }}>Only body</Card.Body>
      </Card>,
    );

    expect(screen.queryByTestId(`${baseTestId}-Image`)).not.toBeInTheDocument();
    expect(screen.queryByTestId(`${baseTestId}-Label`)).not.toBeInTheDocument();
    expect(screen.getByTestId(`${baseTestId}-Body`)).toHaveTextContent('Only body');
  });
});
