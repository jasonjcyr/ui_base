import { Textarea } from './Textarea';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Textarea', () => {
  it('renders with label and placeholder', () => {
    render(
      <Textarea id="bio" label="Bio" placeholder="Tell us more..." value="" onChange={() => {}} />,
    );
    expect(screen.getByLabelText('Bio')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Tell us more...')).toBeInTheDocument();
  });

  it('renders helper text', () => {
    render(<Textarea id="bio" value="" onChange={() => {}} helperText="This is required" />);
    expect(screen.getByText('This is required')).toBeInTheDocument();
  });

  it('shows error styling when error is true', () => {
    const { container } = render(
      <Textarea id="bio" value="" onChange={() => {}} error helperText="Invalid input" />,
    );
    expect(container.querySelector('.error')).toBeTruthy();
    expect(screen.getByText('Invalid input')).toHaveClass('errorText');
  });

  it('disables textarea when disabled', () => {
    render(<Textarea id="bio" value="" onChange={() => {}} disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('calls onChange handler', () => {
    const handleChange = jest.fn();
    render(<Textarea id="bio" value="" onChange={handleChange} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Hello' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('applies test metadata correctly', () => {
    const { container } = render(
      <Textarea
        id="bio"
        value=""
        onChange={() => {}}
        testMetadata={{
          'data-testid': 'textarea-test',
          'data-uitest': 'textarea-ui',
        }}
      />,
    );
    expect(container.firstChild).toHaveAttribute('data-testid', 'textarea-test');
    expect(container.firstChild).toHaveAttribute('data-uitest', 'textarea-ui');
  });
});
