'use client';

import { TextInput, TextInputProps } from './TextInput';
import type { Meta, StoryObj } from '@storybook/react';

import { useState } from 'react';

const meta: Meta<TextInputProps> = {
  title: 'Components/TextInput',
  component: TextInput,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Text inputs allow users to enter and edit text. They're commonly used in forms, search fields, and other data entry interfaces.

✅ **When to use it**  
Use a text input when the user needs to enter short, single-line text information like a name, email, or search term.

🔧 **Usage guidelines**  
- Always provide a clear and concise label.
- Indicate required fields clearly.
- Use helper text or error messages to guide the user.
- Avoid placeholder-only labeling for accessibility.

✍️ **Content guidelines**  
- Label should be a noun or noun phrase.
- Placeholder text should be an example or guide (e.g., "Enter your name").
- Error messages should be short, specific, and actionable.

🧪 **Testing support**  
Supports \`data-testid\` and \`data-uitest\` via \`testMetaData\` prop for reliable test targeting.
        `.trim(),
      },
    },
  },
};

export default meta;

type Story = StoryObj<TextInputProps>;

export const Default: Story = {
  args: {
    label: 'Name',
    placeholder: 'Enter your name',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    helperText: 'We’ll never share your email.',
  },
};

export const WithError: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter password',
    error: 'Password must be at least 8 characters',
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Full Name',
    fullWidth: true,
    placeholder: 'John Doe',
  },
};

export const WithIcon: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search...',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M10 2a8 8 0 105.293 14.293l5.707 5.707-1.414 1.414-5.707-5.707A8 8 0 1010 2zm0 2a6 6 0 110 12 6 6 0 010-12z" />
      </svg>
    ),
  },
};

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState('');

    return <TextInput {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
  },
  args: {
    label: 'Controlled Input',
    placeholder: 'Type here...',
  },
};
