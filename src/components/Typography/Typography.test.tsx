import { Typography } from './Typography';
import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import { render, screen } from '@testing-library/react';

describe('<Typography />', () => {
  it('renders default as <p> with default variant and testMetaData', () => {
    render(
      <Typography testMetaData={{ 'data-testid': 'typography-default' }}>Default Text</Typography>,
    );

    const element = screen.getByTestId('typography-default');
    expect(element.tagName).toBe('P');
    expect(element).toHaveTextContent('Default Text');
  });

  it('renders with heading variant and inferred tag', () => {
    render(
      <Typography variant="h2" testMetaData={{ 'data-testid': 'typography-heading' }}>
        Heading Text
      </Typography>,
    );

    const element = screen.getByTestId('typography-heading');
    expect(element.tagName).toBe('H2');
    expect(element).toHaveTextContent('Heading Text');
  });

  it('respects custom `as` prop overriding inferred tag', () => {
    render(
      <Typography as="span" variant="h3" testMetaData={{ 'data-testid': 'typography-span' }}>
        Span Text
      </Typography>,
    );

    const element = screen.getByTestId('typography-span');
    expect(element.tagName).toBe('SPAN');
    expect(element).toHaveTextContent('Span Text');
  });

  it('applies custom className', () => {
    render(
      <Typography className="custom-class" testMetaData={{ 'data-testid': 'typography-class' }}>
        Custom Class Text
      </Typography>,
    );

    const element = screen.getByTestId('typography-class');
    expect(element).toHaveClass('custom-class');
  });
});

jest.mock('./Typography.module.scss', () => ({
  default: {},
}));

describe('<Typography /> - variantClass missing warning', () => {
  const originalWarn = console.warn;
  const originalEnv = process.env.NODE_ENV;

  beforeEach(() => {
    console.warn = jest.fn();
    process.env.NODE_ENV = 'development';
  });

  afterEach(() => {
    console.warn = originalWarn;
    process.env.NODE_ENV = originalEnv;
  });

  it('logs warning when variantClass is missing in development', () => {
    render(
      <Typography variant="body" testMetaData={{ 'data-testid': 'typography-missing-class' }}>
        Text
      </Typography>,
    );

    expect(console.warn).toHaveBeenCalledWith(
      '[Typography] Missing SCSS class for variant: typography-body',
    );
  });
});
