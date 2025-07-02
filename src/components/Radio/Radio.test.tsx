import { Radio } from './Radio';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Radio', () => {
  it('renders with label', () => {
    render(
      <Radio
        id="radio1"
        label="Option A"
        name="group"
        value="a"
        checked={false}
        onChange={() => {}}
      />,
    );
    expect(screen.getByLabelText('Option A')).toBeInTheDocument();
  });

  it('calls onChange when clicked', () => {
    const handleChange = jest.fn();
    render(
      <Radio
        id="radio1"
        label="Option A"
        name="group"
        value="a"
        checked={false}
        onChange={handleChange}
      />,
    );
    fireEvent.click(screen.getByLabelText('Option A'));
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('shows helper text', () => {
    render(
      <Radio
        id="radio2"
        label="Option B"
        name="group"
        value="b"
        checked={false}
        onChange={() => {}}
        helperText="Helpful note"
      />,
    );
    expect(screen.getByText('Helpful note')).toBeInTheDocument();
  });

  it('applies error styling', () => {
    const { container } = render(
      <Radio
        id="radio3"
        label="Error Option"
        name="group"
        value="c"
        checked={false}
        onChange={() => {}}
        error
        helperText="Error required"
      />,
    );
    expect(container.querySelector(`.error`)).toBeInTheDocument();
  });
});
