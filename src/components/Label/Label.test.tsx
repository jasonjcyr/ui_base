import { Label } from './Label';
import { render, screen } from '@testing-library/react';

describe('Label', () => {
  it('renders label text', () => {
    render(<Label htmlFor="test" children="Name" />);
    expect(screen.getByText('Name')).toBeInTheDocument();
  });

  it('renders required asterisk', () => {
    render(<Label htmlFor="test" children="Name" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('applies disabled class when disabled', () => {
    const { container } = render(<Label htmlFor="test" children="Name" disabled />);
    expect(container.querySelector('.disabled')).toBeInTheDocument();
  });
});
