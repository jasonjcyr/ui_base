'use client';

import { Label } from './Label';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Label> = {
  title: 'Components/Label',
  component: Label,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Use labels to describe the purpose of a form input.

---

✅ **Best Practices**
- Always associate a label with a form control using \`htmlFor\`
- Use a required indicator if applicable
- Use disabled styling when relevant
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {
    htmlFor: 'username',
    children: 'Username',
  },
};

export const Required: Story = {
  args: {
    htmlFor: 'email',
    children: 'Email address',
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    htmlFor: 'password',
    children: 'Password',
    disabled: true,
  },
};
