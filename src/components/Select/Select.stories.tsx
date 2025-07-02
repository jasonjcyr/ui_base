'use client';

import { Select, SelectProps } from './Select';
import type { Meta, StoryObj } from '@storybook/react';

import { useState } from 'react';

const meta: Meta<SelectProps> = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `

Dropdowns (Select components) allow users to select a single item from a list of options. They are useful when space is limited or when there are many options.

---

✅ **When to use it**
- Users need to choose one item from a long or compact list (e.g., country, category).
- Use when the list of options is not expected to change often.

🔧 **Usage guidelines**
- Always provide a label and placeholder.
- Keep the list of options concise and meaningful.
- Show a clear default state (e.g., placeholder like "Select a fruit").
- Show helper text for context or error messages when applicable.

✍️ **Content guidelines**
- Use sentence case (e.g., "Select a fruit").
- Keep option labels short and clear.
- Use meaningful and accessible \`label\` props.

🧬 **Test metadata support**
Supports \`data-testid\` and \`data-uitest\` for easier automation and testing.

\`\`\`tsx
<Select
  id="fruit"
  label="Favorite Fruit"
  value={selected}
  onChange={handleChange}
  options={[
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
  ]}
  placeholder="Select a fruit..."
  testMetadata={{
    'data-testid': 'fruit-select',
    'data-uitest': 'fruit-select-ui',
  }}
/>
\`\`\`
        `.trim(),
      },
    },
  },
};

export default meta;

type Story = StoryObj<SelectProps>;

export const Default: Story = {
  args: {
    id: 'fruit',
    label: 'Favorite Fruit',
    value: '',
    placeholder: 'Select a fruit...',
    options: [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
      { label: 'Cherry', value: 'cherry' },
    ],
    onChange: () => {},
  },
};

export const WithHelperText: Story = {
  args: {
    ...Default.args,
    helperText: 'Select your preferred fruit from the dropdown.',
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('banana');
    return (
      <Select
        id="controlled-fruit"
        label="Controlled Fruit"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        options={[
          { label: 'Apple', value: 'apple' },
          { label: 'Banana', value: 'banana' },
          { label: 'Cherry', value: 'cherry' },
        ]}
        helperText={`Current value: ${value}`}
        placeholder="Select a fruit..."
        testMetadata={{
          'data-testid': 'controlled-fruit',
          'data-uitest': 'controlled-fruit-ui',
        }}
      />
    );
  },
};
