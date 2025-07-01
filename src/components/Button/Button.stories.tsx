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
Buttons allow users to initiate an action or command when clicked or tapped, which makes them a fundamental building block of our products.

---

## ✅ When to use it
- Users need to **navigate** through a product or **perform an action** (e.g., "Save", "Submit").

---

## 🔧 Usage guidelines
- Always label buttons **clearly**.
- Choose variants based on **visual priority**.
- Place buttons **consistently** within interfaces.
- Combine types (e.g. primary + secondary) when offering **multiple choices**.
- Show a **loading state** when saving or submitting information.

---

## ✍️ Content guidelines
- Start with a **verb** + **noun**: \`"Confirm order"\`
- Limit to **3 words max**
- Use **sentence case** (capitalize first word and proper nouns)
- Exceptions: \`"Save"\`, \`"Cancel"\`, \`"Close"\`

---

## 🧬 Polymorphic support (\`as\` prop)

Supports rendering as any element (e.g., \`<a>\`, \`next/link\`, \`<div>\`, etc.).

\`\`\`tsx
import Link from 'next/link';

<Button as={Link} href="/about">About Us</Button>
<Button as="a" href="https://example.com">External Link</Button>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger'],
    },
    size: {
      control: 'select',
      options: ['xl', 'lg', 'md', 'sm'],
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    iconOnly: { control: 'boolean' },
    destructive: { control: 'boolean' },
    icon: { control: false },
    spinner: { control: false },
    testMetaData: { control: false },
  },
  args: {
    variant: 'secondary',
    size: 'md',
    disabled: false,
    loading: false,
    fullWidth: false,
    iconOnly: false,
    destructive: false,
    children: 'Say hello',
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// Default Button
export const Default: Story = {
  parameters: {
    docs: {
      source: { code: `<Button>Say hello</Button>` },
    },
  },
};

// Variants side by side
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
};

// Sizes side by side
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

// Button with Icon
export const WithIcon: Story = {
  args: {
    icon: <ArrowLeft />,
    children: 'Back',
  },
};

// IconOnly button
export const IconOnly: Story = {
  args: {
    iconOnly: true,
    icon: <ArrowLeft />,
    'aria-label': 'Back',
  },
};

// Loading state
export const Loading: Story = {
  args: {
    loading: true,
    children: 'Loading...',
  },
};

// Full width
export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: 'Full Width Button',
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
};

// Destructive prop
export const Destructive: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Button variant="primary" destructive>
        Delete
      </Button>
      <Button variant="secondary" destructive>
        Remove
      </Button>
    </div>
  ),
};

// As Next.js Link
export const AsNextLink: Story = {
  render: () => (
    <Button as={Link} href="/about">
      About Us
    </Button>
  ),
  parameters: {
    docs: {
      description: {
        story: `This button is rendered as a Next.js \`<Link>\` component using the \`as\` prop.`,
      },
      source: {
        code: `
import Link from 'next/link';

<Button as={Link} href="/about">
  About Us
</Button>`,
      },
    },
  },
};

// As Native Anchor
export const AsAnchor: Story = {
  render: () => (
    <Button as="a" href="https://example.com" target="_blank" rel="noopener noreferrer">
      External Link
    </Button>
  ),
  parameters: {
    docs: {
      description: {
        story: `This button is rendered as a native HTML anchor tag.`,
      },
      source: {
        code: `<Button as="a" href="https://example.com">External Link</Button>`,
      },
    },
  },
};
