import { AutoFitText } from './AutoFitText';
import type { Meta, StoryObj } from '@storybook/react';

import React, { useState } from 'react';

const meta: Meta<typeof AutoFitText> = {
  title: 'Components/AutoFitText',
  component: AutoFitText,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    docs: {
      description: {
        component: `
AutoFitText automatically resizes the text horizontally to ensure it fits within its container.

---

## When to use it
Use AutoFitText when you have dynamic or potentially long strings that must fit on a single line within a constrained width, such as tags, labels, or badges.

## Usage guidelines
- The text will shrink only if it's wider than the container.
- It does not break lines or truncate with ellipses.
- Ensure the container has a defined width for the resizing to work.

## Content guidelines
- Text content should be meaningful and short where possible.
- Consider adding tooltips for longer content.
        `,
      },
    },
  },
  argTypes: {
    text: { control: 'text', description: 'The string to be displayed and scaled.' },
    className: { control: 'text', description: 'Optional custom class name.' },
    testMetaData: { control: false },
  },
  args: {
    text: 'Auto fitting text here',
  },
};

export default meta;
type Story = StoryObj<typeof AutoFitText>;

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `<AutoFitText text="Auto fitting text here" />`,
      },
    },
  },
};

export const InteractiveCard: Story = {
  render: (args) => {
    const [text, setText] = useState('Adjust me!');

    return (
      <div
        style={{
          resize: 'both',
          overflow: 'auto',
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '1rem',
          minWidth: '200px',
          minHeight: '150px',
          width: '300px',
        }}
      >
        <label htmlFor="text-input" style={{ display: 'block', marginBottom: '0.5rem' }}>
          Enter Text:
        </label>
        <input
          id="text-input"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            width: '100%',
            boxSizing: 'border-box',
            marginBottom: '1rem',
            padding: '0.5rem',
            fontWeight: 'bold',
          }}
        />
        <AutoFitText {...args} text={text} />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
### Interactive Resizable Card

- The **input is now inside the card** and scales with the card size.
- Resize the card using the bottom-right corner.
- The text below auto-scales to fit within the card.
        `,
      },
    },
  },
};
