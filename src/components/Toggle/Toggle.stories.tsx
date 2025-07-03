'use client';

import { Toggle } from './Toggle';
import type { Meta, StoryObj } from '@storybook/react';

import { useState } from 'react';

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Toggle allows users to switch between two states, such as on/off or active/inactive.

---

✅ **When to use it**
- For binary choices such as enabling/disabling a feature.
- Great for preferences and settings.

🧪 **Test metadata support**
Each component element (Toggle, Label, Helper, Error) supports \`data-testid\` and \`data-uitest\`.

\`\`\`tsx
<Toggle
  id="dark-mode"
  label="Enable dark mode"
  checked={true}
  onChange={() => {}}
  helperText="Toggles site theme"
  testMetaData={{
    'data-testid': 'darkmode-toggle',
    'data-uitest': 'darkmode-toggle-ui',
  }}
/>
\`\`\`
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  args: {
    id: 'toggle-default',
    label: 'Enable setting',
    testMetaData: { 'data-testid': 'toggle-default' },
  },
};

export const WithHelperText: Story = {
  args: {
    id: 'toggle-helper',
    label: 'Show advanced options',
    helperText: 'Toggles visibility of advanced features',
    testMetaData: { 'data-testid': 'toggle-helper' },
  },
};

export const Error: Story = {
  args: {
    id: 'toggle-error',
    label: 'Subscribe to updates',
    error: 'This setting is required',
    testMetaData: { 'data-testid': 'toggle-error' },
  },
};

export const Disabled: Story = {
  args: {
    id: 'toggle-disabled',
    label: 'Unavailable setting',
    disabled: true,
    testMetaData: { 'data-testid': 'toggle-disabled' },
  },
};

export const Controlled: Story = {
  render: () => {
    const [enabled, setEnabled] = useState(false);

    return (
      <Toggle
        id="toggle-controlled"
        label="Enable dark mode"
        checked={enabled}
        onChange={() => setEnabled(!enabled)}
        helperText={enabled ? 'Enabled' : 'Disabled'}
        testMetaData={{ 'data-testid': 'toggle-controlled' }}
      />
    );
  },
};
