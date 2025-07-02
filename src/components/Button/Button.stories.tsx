'use client';

import { Button } from './Button';
import type { Meta, StoryObj } from '@storybook/react';

import Link from 'next/link';

import { ArrowLeft } from 'lucide-react';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    docs: {
      description: {
        component: `
Buttons allow users to initiate an action or command when clicked or tapped.

---

✅ **When to use**
- Navigate to another screen or page
- Submit a form or trigger an event
- Perform a key action like "Save", "Close", or "Confirm"

---

🔧 **Usage**
- Always label buttons clearly
- Choose variants based on visual priority
- Use loading and disabled states for feedback
- Match size and spacing to layout

---

✍️ **Content guidelines**
- Use sentence case
- Start with a **verb**: "Confirm order"
- Keep label under 3 words

---

🧬 **Polymorphism**
Supports rendering as any element via the \`as\` prop.

\`\`\`tsx
<Button as="a" href="https://example.com">Link</Button>
<Button as={Link} href="/about">Next Link</Button>
\`\`\`
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Say Hello',
  },
};

export const WithIcon: Story = {
  args: {
    icon: <ArrowLeft />,
    children: 'Back',
  },
};

export const IconOnly: Story = {
  args: {
    iconOnly: true,
    icon: <ArrowLeft />,
    'aria-label': 'Back',
  },
  parameters: {
    docs: {
      description: {
        story: `Use \`iconOnly\` for icon buttons. Ensure \`aria-label\` is provided for accessibility.`,
      },
      source: {
        code: `<Button iconOnly icon={<ArrowLeft />} aria-label="Back" />`,
      },
    },
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: 'Loading...',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled',
  },
};

export const Destructive: Story = {
  args: {
    children: 'Delete',
    variant: 'primary',
    destructive: true,
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: 'Full Width Button',
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  ),
};

export const AsAnchor: Story = {
  render: () => (
    <Button as="a" href="https://example.com" target="_blank" rel="noopener noreferrer">
      External Link
    </Button>
  ),
  parameters: {
    docs: {
      description: {
        story: `Renders as a native HTML anchor tag with external URL.`,
      },
      source: {
        code: `<Button as="a" href="https://example.com">External Link</Button>`,
      },
    },
  },
};

export const AsNextLink: Story = {
  render: () => (
    <Button as={Link} href="/about">
      About Page
    </Button>
  ),
  parameters: {
    docs: {
      description: {
        story: `Renders as a Next.js <Link> using the \`as\` prop.`,
      },
      source: {
        code: `
import Link from 'next/link';

<Button as={Link} href="/about">
  About Page
</Button>`,
      },
    },
  },
};
