'use client';

import { Accordion } from './Accordion';
import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@/components/Button';
import { Typography } from '@/components/Typography';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    docs: {
      description: {
        component: `
Accordions show and hide content in a vertically stacked manner. Ideal for FAQs, filter sections, or revealing contextual information.

---

✅ **When to use**
- Group content into expandable sections
- Present long content in a compact layout
- Let users scan and reveal details on demand

---

🧩 **Compound API**

Use as:

\`\`\`tsx
<Accordion>
  <Accordion.Item>
    <Accordion.Trigger>Label</Accordion.Trigger>
    <Accordion.Content>Body</Accordion.Content>
  </Accordion.Item>
</Accordion>
\`\`\`

---

⚙️ **Features**
- Pass \`isOpen\` to initially open an item
- Use \`indicatorPosition="left" | "right"\` on \`Accordion.Trigger\`
- Fully keyboard and screen-reader accessible
- Supports test metadata

---

🧪 **Testing**
- Use \`testMetaData\` for root and sections:
  - \`-Root\`
  - \`-Item\`
  - \`-Trigger\`
  - \`-Content\`
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  name: 'Single Accordion Item',
  render: () => (
    <Accordion testMetaData={{ 'data-testid': 'accordion-default' }}>
      <Accordion.Item testMetaData={{ 'data-testid': 'accordion-default-item' }}>
        <Accordion.Trigger testMetaData={{ 'data-testid': 'accordion-default-trigger' }}>
          What is your return policy?
        </Accordion.Trigger>
        <Accordion.Content testMetaData={{ 'data-testid': 'accordion-default-content' }}>
          We accept returns within 30 days of purchase with original packaging.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
};

export const MultipleItems: Story = {
  name: 'Multiple Items',
  render: () => (
    <Accordion testMetaData={{ 'data-testid': 'accordion-multi' }}>
      <Accordion.Item>
        <Accordion.Trigger>Shipping Info</Accordion.Trigger>
        <Accordion.Content>
          All orders ship within 1-2 business days via UPS or FedEx.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item>
        <Accordion.Trigger>Warranty</Accordion.Trigger>
        <Accordion.Content>
          We offer a 1-year warranty on all electronics and accessories.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
};

export const InitiallyOpen: Story = {
  name: 'Initially Open Item',
  render: () => (
    <Accordion testMetaData={{ 'data-testid': 'accordion-open' }}>
      <Accordion.Item isOpen>
        <Accordion.Trigger>How does billing work?</Accordion.Trigger>
        <Accordion.Content>
          You will be charged monthly unless you cancel your subscription.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
};

export const IndicatorLeft: Story = {
  name: 'Indicator on Left',
  render: () => (
    <Accordion testMetaData={{ 'data-testid': 'accordion-left' }}>
      <Accordion.Item>
        <Accordion.Trigger indicatorPosition="left">Support Hours</Accordion.Trigger>
        <Accordion.Content>We’re open Monday through Friday, 9am to 5pm EST.</Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Use `indicatorPosition="left"` on `Accordion.Trigger` to move the chevron.',
      },
      source: {
        code: `
<Accordion>
  <Accordion.Item>
    <Accordion.Trigger indicatorPosition="left">
      Support Hours
    </Accordion.Trigger>
    <Accordion.Content>
      We’re open Monday through Friday, 9am to 5pm EST.
    </Accordion.Content>
  </Accordion.Item>
</Accordion>
        `.trim(),
      },
    },
  },
};

export const CustomContent: Story = {
  name: 'Custom Content',
  render: () => (
    <Accordion testMetaData={{ 'data-testid': 'accordion-custom' }}>
      <Accordion.Item>
        <Accordion.Trigger>Can I cancel anytime?</Accordion.Trigger>
        <Accordion.Content>
          <Typography variant="body">
            Yes! You can cancel your subscription from your dashboard at any time.
          </Typography>
          <Button size="sm" variant="secondary" style={{ marginTop: '0.5rem' }}>
            Go to Dashboard
          </Button>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Content can contain any React nodes like Typography, Button, or images.',
      },
    },
  },
};

export const NoContent: Story = {
  name: 'No Content',
  render: () => (
    <Accordion>
      <Accordion.Item>
        <Accordion.Trigger>This just toggles nothing</Accordion.Trigger>
      </Accordion.Item>
    </Accordion>
  ),
  parameters: {
    docs: {
      description: {
        story: 'If no `<Accordion.Content>` is provided, only the trigger is rendered.',
      },
    },
  },
};
