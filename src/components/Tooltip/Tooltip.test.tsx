import { Tooltip } from './Tooltip';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('Tooltip', () => {
  it('renders tooltip content on hover', () => {
    render(
      <Tooltip content="Helpful tip" testMetaData={{ 'data-testid': 'help-tooltip' }}>
        <button>Hover me</button>
      </Tooltip>,
    );

    const wrapper = screen.getByTestId('help-tooltip');
    expect(wrapper).toBeInTheDocument();
    expect(wrapper).toHaveTextContent('Hover me');
    expect(wrapper).toHaveTextContent('Helpful tip');
  });
});
