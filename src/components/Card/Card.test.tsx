import '@testing-library/jest-dom';
import { Card, CardProps } from './Card';
import { render,screen } from '@testing-library/react';

const defaultCardProps: CardProps = {
  children: 'Card content',
  heading: 'Card Heading',
  backgroundColor: 'white',
  callToActions: [
    {
      children: 'Action 1',
      variant: 'primary',
      size: 'md',
      testMetaData: { 'data-testid': 'action-1' },
    },],
  image: {
    url: 'https://example.com/image.jpg',
    description: 'Example image',
  },
  testMetaData: { 'data-testid': 'card-default' },
};
describe('<Card />', () => {
  it('renders card with default props', () => {
    render(<Card {...defaultCardProps} />);
    expect(screen.getByTestId('card-default')).toBeInTheDocument();
    expect(screen.getByText('Card Heading')).toBeInTheDocument();
    expect(screen.getByAltText('Example image')).toBeInTheDocument();
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });
});