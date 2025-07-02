'use client';

import { Radio } from './Radio';
import type { Meta, StoryObj } from '@storybook/react';

import { useState } from 'react';

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Radios let users select a **single option** from a set.

✅ **When to use**
- Choose **one** of several mutually exclusive options
- Use in forms or filters
- Pair with a \`RadioGroup\` for better layout & accessibility

---

🔧 **Usage**
- Always pair with a visible label
- Show helper or error text when necessary
- Use \`checked\` and \`onChange\` for controlled behavior

---

🧬 **Test metadata**
Supports \`data-testid\` and \`data-uitest\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  render: () => (
    <Radio
      id="default"
      name="option"
      value="default"
      label="Select this"
      checked={false}
      onChange={() => {}}
    />
  ),
};

export const WithHelperText: Story = {
  render: () => (
    <Radio
      id="helper"
      name="option"
      value="helper"
      label="Choose me"
      helperText="Helpful context for this choice"
      checked={false}
      onChange={() => {}}
    />
  ),
};

export const Error: Story = {
  render: () => (
    <Radio
      id="error"
      name="option"
      value="error"
      label="Invalid option"
      error
      helperText="This selection is required"
      checked={false}
      onChange={() => {}}
    />
  ),
};

export const Disabled: Story = {
  render: () => (
    <Radio
      id="disabled"
      name="option"
      value="disabled"
      label="Disabled choice"
      disabled
      checked={false}
      onChange={() => {}}
    />
  ),
};

export const Controlled: Story = {
  render: () => {
    const [selected, setSelected] = useState('one');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Radio
          id="radio1"
          name="controlled"
          value="one"
          label="Option One"
          checked={selected === 'one'}
          onChange={() => setSelected('one')}
        />
        <Radio
          id="radio2"
          name="controlled"
          value="two"
          label="Option Two"
          checked={selected === 'two'}
          onChange={() => setSelected('two')}
        />
        <Radio
          id="radio3"
          name="controlled"
          value="three"
          label="Option Three"
          checked={selected === 'three'}
          onChange={() => setSelected('three')}
        />
      </div>
    );
  },
};
