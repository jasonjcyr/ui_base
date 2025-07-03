'use client';

import { Checkbox } from './Checkbox';
import type { Meta, StoryObj } from '@storybook/react';

import { useState } from 'react';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Checkboxes let users select one or more items from a set.

✅ **When to use**
- Multi-select fields
- Agreement to terms or conditions

---

🔧 **Usage**
- Always provide a visible label
- Include helper or error text when appropriate
- Use disabled state to prevent interaction

🧬 **Test metadata**
Supports \`data-testid\` and \`data-uitest\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox
        id="default"
        label="I agree to the terms"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
    );
  },
};

export const WithHelperText: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox
        id="helper"
        label="I agree to the terms"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        helperText="You must accept before continuing"
      />
    );
  },
};

export const WithErrorText: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox
        id="error"
        label="Accept terms"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        errorText="This field is required"
      />
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <Checkbox id="disabled" label="Disabled option" checked disabled onChange={() => {}} />
  ),
};
