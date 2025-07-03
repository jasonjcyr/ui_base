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

  it('shows error message and sets aria-invalid', () => {
    render(
      <Textarea
        id="bio"
        value=""
        onChange={() => {}}
        error="Invalid input"
        helperText="Should not display"
      />,
    );
    expect(screen.getByText('Invalid input')).toBeInTheDocument();
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
    expect(textarea).toHaveAttribute('aria-describedby', 'bio-help');
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
        testMetaData={{
          'data-testid': 'textarea-test',
          'data-uitest': 'textarea-ui',
        }}
      />,
    );
    // Updated to match the transformed value with '-Textarea'
    expect(container.firstChild).toHaveAttribute('data-testid', 'textarea-test-Textarea');
    expect(container.firstChild).toHaveAttribute('data-uitest', 'textarea-ui-Textarea');
  });
});
