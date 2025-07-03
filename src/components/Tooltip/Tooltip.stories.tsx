import { Tooltip } from './Tooltip';
import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@/components/Button';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The Tooltip component displays informative text when users hover over, focus on, or tap an element.

---

✅ **Use cases**
- Provide explanations or context-sensitive help.
- Avoid cluttering the interface with unnecessary details.

✍️ **Guidelines**
- Keep text concise and clear.
- Don't use tooltips for critical information that must always be visible.

🧪 **Test metadata support**
Supports \`data-testid\` and \`data-uitest\`.

\`\`\`tsx
<Tooltip content="Helpful information">
  <Button testMetaData={{ 'data-testid': 'tooltip-trigger' }}>Hover me</Button>
</Tooltip>
\`\`\`
        `.trim(),
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Top: Story = {
  args: {
    content: 'Tooltip on top',
    position: 'top',
    children: <Button testMetaData={{ 'data-testid': 'tooltip-top-button' }}>Hover me</Button>,
  },
};

export const Bottom: Story = {
  args: {
    content: 'Tooltip below',
    position: 'bottom',
    children: <Button testMetaData={{ 'data-testid': 'tooltip-bottom-button' }}>Hover me</Button>,
  },
};

export const Left: Story = {
  args: {
    content: 'Tooltip on left',
    position: 'left',
    children: <Button testMetaData={{ 'data-testid': 'tooltip-left-button' }}>Hover me</Button>,
  },
};

export const Right: Story = {
  args: {
    content: 'Tooltip on right',
    position: 'right',
    children: <Button testMetaData={{ 'data-testid': 'tooltip-right-button' }}>Hover me</Button>,
  },
};
