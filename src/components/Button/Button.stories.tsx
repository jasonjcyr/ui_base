import { Button } from './Button';
import type { Meta, StoryObj } from '@storybook/react';

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

## When to use it

Use buttons when users need to either navigate through a product or perform a specific action.

## Usage guidelines

- Always label buttons clearly.
- Think about priority when choosing the button variant.
- Place buttons predictably and coherently.
- Combine different button types if multiple actions exist.
- Use loading states when saving/inputting info.

## Content guidelines

- Start labels with an actionable verb and noun ("Confirm order").
- Keep labels to max 3 words.
- Only capitalize first word and proper nouns.
- Acceptable exceptions: "Save", "Cancel", "Close".
`,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger'],
      description: 'Choose the button variant.',
      defaultValue: 'secondary',
    },
    size: {
      control: 'select',
      options: ['xl', 'lg', 'md', 'sm'],
      description: 'Select the button size.',
      defaultValue: 'md',
    },
    disabled: { control: 'boolean', description: 'Disable the button.' },
    loading: { control: 'boolean', description: 'Set loading state.' },
    fullWidth: { control: 'boolean', description: 'Stretch to full width.' },
    iconOnly: { control: 'boolean', description: 'Show only icon, no label.' },
    destructive: { control: 'boolean', description: 'Destructive action.' },
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

// Default story
export const Default: Story = {
  parameters: {
    docs: {
      source: { code: `<Button>Say hello</Button>` },
    },
  },
};

// Variants story (all variants side by side)
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
### Variants

- **Primary** — Most important action.
- **Secondary** — Complementary actions.
- **Ghost** — Minimal alternative.
- **Danger** — Destructive variant.
        `,
      },
    },
  },
};

// ✅ ✅ ✅ New Danger story
export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Danger Button',
  },
  parameters: {
    docs: {
      description: {
        story: `
### Danger Variant

Use the danger variant for irreversible or dangerous actions.
        `,
      },
      source: {
        code: `<Button variant="danger">Danger Button</Button>`,
      },
    },
  },
};

// Destructive story (boolean prop)
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
  parameters: {
    docs: {
      description: {
        story: `
### Destructive Prop

Use \`destructive=true\` for irreversible actions, applied on top of variants.
        `,
      },
    },
  },
};

// Sizes
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

// WithIcon
export const WithIcon: Story = {
  args: {
    icon: <ArrowLeft />,
    children: 'Back',
  },
};

// IconOnly
export const IconOnly: Story = {
  args: {
    iconOnly: true,
    icon: <ArrowLeft />,
    'aria-label': 'Back',
  },
};

// Loading
export const Loading: Story = {
  args: {
    loading: true,
    children: 'Loading...',
  },
};

// FullWidth
export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: 'Full Width Button',
  },
};

// Disabled
export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
};
