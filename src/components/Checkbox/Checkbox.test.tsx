import { Checkbox } from './Checkbox';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Checkbox', () => {
  it('renders the label', () => {
    render(<Checkbox id="check" label="Accept" checked={false} onChange={() => {}} />);
    expect(screen.getByText('Accept')).toBeInTheDocument();
  });

  it('triggers onChange when clicked', () => {
    const handleChange = jest.fn();
    render(<Checkbox id="check" label="Accept" checked={false} onChange={handleChange} />);
    fireEvent.click(screen.getByLabelText('Accept'));
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('renders helper text', () => {
    render(
      <Checkbox
        id="check"
        label="Accept"
        checked={false}
        onChange={() => {}}
        helperText="You must agree"
      />,
    );
    expect(screen.getByText('You must agree')).toBeInTheDocument();
  });

  it('renders error text and sets aria attributes', () => {
    render(
      <Checkbox
        id="check"
        label="Accept"
        checked={false}
        onChange={() => {}}
        errorText="This is required"
      />,
    );
    const input = screen.getByLabelText('Accept');
    expect(screen.getByText('This is required')).toBeInTheDocument();
    expect(input).toHaveAttribute('aria-describedby', 'check-error');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('disables checkbox when disabled prop is set', () => {
    render(<Checkbox id="check" label="Accept" checked={false} onChange={() => {}} disabled />);
    expect(screen.getByLabelText('Accept')).toBeDisabled();
  });
});
