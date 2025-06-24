import { Button } from './Button';
import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';

import { ArrowLeft } from 'lucide-react';

// Full Storybook Metadata
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

// Default button
export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `<Button>Say hello</Button>`,
      },
    },
  },
};

// Variants section
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
- **Danger** — Destructive actions.
        `,
      },
      source: {
        code: `
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>
        `.trim(),
      },
    },
  },
};

// Sizes section (now updated with your actual sizes)
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
### Sizes

The button component supports 4 sizes:

- **Extra Large (xl)** — for hero calls to action.
- **Large (lg)** — for higher emphasis.
- **Medium (md)** — default, used for most cases.
- **Small (sm)** — use when space is limited or for less important actions.
        `,
      },
      source: {
        code: `
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>
        `.trim(),
      },
    },
  },
};

// Destructive
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
### Destructive variant

Used for irreversible or dangerous actions.
        `,
      },
      source: {
        code: `
<Button variant="primary" destructive>Delete</Button>
<Button variant="secondary" destructive>Remove</Button>
        `.trim(),
      },
    },
  },
};

// With icons
export const WithIcon: Story = {
  args: {
    icon: <ArrowLeft />,
    children: 'Back',
  },
  parameters: {
    docs: {
      source: {
        code: `
import { ArrowLeft } from 'lucide-react';

<Button icon={<ArrowLeft />}>Back</Button>
        `.trim(),
      },
    },
  },
};

// Icon only button
export const IconOnly: Story = {
  args: {
    iconOnly: true,
    icon: <ArrowLeft />,
    'aria-label': 'Back',
  },
  parameters: {
    docs: {
      source: {
        code: `
import { ArrowLeft } from 'lucide-react';

<Button iconOnly aria-label="Back" icon={<ArrowLeft />} />
        `.trim(),
      },
    },
  },
};

// Loading state
export const Loading: Story = {
  args: {
    loading: true,
    children: 'Loading...',
  },
  parameters: {
    docs: {
      source: {
        code: `<Button loading>Loading...</Button>`,
      },
    },
  },
};

// Full width button
export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: 'Full Width Button',
  },
  parameters: {
    docs: {
      source: {
        code: `<Button fullWidth>Full Width Button</Button>`,
      },
    },
  },
};

// Disabled button
export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
  parameters: {
    docs: {
      source: {
        code: `<Button disabled>Disabled Button</Button>`,
      },
    },
  },
};
