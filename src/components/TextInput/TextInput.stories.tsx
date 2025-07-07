'use client';

import { TextInput, TextInputProps } from './TextInput';
import type { Meta, StoryObj } from '@storybook/react';

import { useEffect, useState } from 'react';

import { Button } from '../Button/Button';
import { Skeleton } from '../Skeleton/Skeleton';

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

export const WithSkeleton: Story = {
  name: 'With Skeleton Loader',
  render: () => {
    const [loading, setLoading] = useState(true);
    const [timer, setTimer] = useState(10);

    // Countdown effect
    useEffect(() => {
      if (!loading) return;

      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setLoading(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }, [loading]);

    const handleRestart = () => {
      setTimer(10);
      setLoading(true);
    };

    return (
      <div style={{ maxWidth: 400 }}>
        <label htmlFor="loading-input" style={{ display: 'block', marginBottom: '0.25rem' }}>
          {loading ? `Loading Name (${timer}s)...` : 'Name'}
        </label>

        {loading ? (
          <Skeleton
            variant="rectangular"
            height="2.5rem"
            borderRadius="0.375rem"
            testMetaData={{
              'data-testid': 'textinput-skeleton',
              'data-uitest': 'textinput-skeleton',
            }}
            style={{ width: '100%' }}
          />
        ) : (
          <TextInput
            id="loading-input"
            placeholder="Enter your name"
            testMetaData={{
              'data-testid': 'textinput-loaded',
              'data-uitest': 'textinput-loaded',
            }}
          />
        )}

        <Button onClick={handleRestart} size="sm" variant="secondary" style={{ marginTop: '1rem' }}>
          Restart Loader
        </Button>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Simulates a loading input using `Skeleton` with a 10-second countdown and a reset button.',
      },
    },
  },
};
