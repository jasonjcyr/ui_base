import { Skeleton } from './Skeleton';
import { render, screen } from '@testing-library/react';

describe('Skeleton', () => {
  it('renders with default variant (text)', () => {
    render(<Skeleton testMetaData={{ 'data-testid': 'skeleton' }} />);
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveClass('skeleton', 'text');
  });

  it('applies custom className', () => {
    render(<Skeleton className="custom-class" testMetaData={{ 'data-testid': 'skeleton' }} />);
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveClass('custom-class');
  });

  it('applies different variants', () => {
    const variants: Array<'text' | 'circle' | 'rectangular' | 'inline'> = [
      'text',
      'circle',
      'rectangular',
      'inline',
    ];

    variants.forEach((variant) => {
      const { unmount } = render(
        <Skeleton variant={variant} testMetaData={{ 'data-testid': 'skeleton' }} />,
      );
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveClass(variant);
      unmount();
    });
  });

  it('applies width, height, and borderRadius as inline styles', () => {
    render(
      <Skeleton
        width="100px"
        height="40px"
        borderRadius="8px"
        testMetaData={{ 'data-testid': 'skeleton' }}
      />,
    );
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveStyle({
      width: '100px',
      height: '40px',
      borderRadius: '8px',
    });
  });

  it('merges user style with width, height, borderRadius props', () => {
    render(
      <Skeleton
        width="120px"
        style={{
          height: '50px',
          borderRadius: '4px',
          backgroundColor: 'red',
        }}
        testMetaData={{ 'data-testid': 'skeleton' }}
      />,
    );
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveStyle({
      width: '120px',
      height: '50px',
      borderRadius: '4px',
    });
    expect(getComputedStyle(skeleton).backgroundColor).toBe('rgb(255, 0, 0)');
  });

  it('respects override precedence', () => {
    render(
      <Skeleton
        width="10rem"
        height="3rem"
        borderRadius="0.5rem"
        style={{
          width: '1rem',
          height: '1rem',
          borderRadius: '1rem',
        }}
        testMetaData={{ 'data-testid': 'skeleton' }}
      />,
    );
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveStyle({
      width: '10rem',
      height: '3rem',
      borderRadius: '0.5rem',
    });
  });

  it('applies test metadata correctly', () => {
    render(
      <Skeleton
        testMetaData={{
          'data-testid': 'skeleton',
          'data-uitest': 'skeleton-ui',
        }}
      />,
    );
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveAttribute('data-uitest', 'skeleton-ui');
  });

  it('renders as a <span>', () => {
    render(<Skeleton testMetaData={{ 'data-testid': 'skeleton' }} />);
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton.tagName).toBe('SPAN');
  });
});
