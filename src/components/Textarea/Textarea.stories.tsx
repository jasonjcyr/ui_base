'use client';

import { Textarea } from './Textarea';
import type { Meta, StoryObj } from '@storybook/react';

import { useState } from 'react';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Textareas are multiline input fields for capturing longer user input such as comments, descriptions, or messages.

---

✅ **When to use it**
- When users need to input more than one line of text.
- Ideal for comments, messages, bios, and explanations.

🔧 **Usage guidelines**
- Always include a label above the textarea.
- Use helper text to clarify intent or provide validation feedback.
- Use an error state to indicate validation issues clearly.
- Consider limiting max length and communicating it to the user.

✍️ **Content guidelines**
- Label should be short and descriptive.
- Placeholder text should be concise and helpful.
- Avoid relying solely on placeholder text for instructions.

🧬 **Test metadata support**
Supports \`data-testid\` and \`data-uitest\` attributes for automation and testing.

\`\`\`tsx
<Textarea
  id="bio"
  label="Biography"
  value={value}
  onChange={handleChange}
  placeholder="Tell us about yourself..."
  helperText="Optional"
  error={false}
  testMetadata={{
    'data-testid': 'bio-textarea',
    'data-uitest': 'bio-textarea-ui'
  }}
/>
\`\`\`
        `.trim(),
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    id: 'bio',
    label: 'Biography',
    placeholder: 'Tell us about yourself...',
    value: '',
    onChange: () => {},
  },
};

export const WithHelperText: Story = {
  args: {
    ...Default.args,
    helperText: 'Optional',
  },
};

export const Error: Story = {
  args: {
    ...Default.args,
    error: true,
    helperText: 'This field is required.',
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
    value: 'This field is disabled',
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('Initial text');
    return (
      <Textarea
        id="controlled"
        label="Controlled Textarea"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        helperText={`Length: ${value.length} characters`}
      />
    );
  },
};

export const WithCharacterCountLimit: Story = {
  render: () => {
    const maxLength = 100;
    const [value, setValue] = useState('');
    return (
      <Textarea
        id="char-limit"
        label="Comment"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        helperText={`${value.length} / ${maxLength} characters`}
        placeholder="Leave a comment..."
      />
    );
  },
};
