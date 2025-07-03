'use client';

import { Card } from './Card';
import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@/components/Button';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    docs: {
      description: {
        component: `
Cards visually group related content and actions in a bordered, elevated container.

---

✅ **When to use**
- Present a focused section of content
- Group information by semantic meaning (e.g. user profile, feature set)
- Wrap controls like buttons or links that relate to a specific feature

---

🔧 **Usage**
- Use \`label\` for section headers (automatically styled via Label component)
- Use \`interactive\` to enable hover-based elevation
- Choose \`elevation\` based on visual depth needs

---

🧩 **Compound API**
The Card supports the following structure:

\`\`\`tsx
<Card label="Profile">
  <Card.Header>Header</Card.Header>
  <Card.Body>Body</Card.Body>
  <Card.Footer>Footer</Card.Footer>
</Card>
\`\`\`

---

🧬 **Testing**
Use \`testMetaData\` to pass base test IDs. Each section will receive a suffix automatically:

- \`-Card\`
- \`-Header\`
- \`-Body\`
- \`-Footer\`
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  name: 'Default Card',
  args: {
    label: 'User Profile',
    elevation: 'md',
    interactive: false,
    testMetaData: { 'data-testid': 'default-card' },
    children: (
      <>
        <Card.Header testMetaData={{ 'data-testid': 'default-card' }}>John Doe</Card.Header>
        <Card.Body testMetaData={{ 'data-testid': 'default-card' }}>
          John is a full-stack developer with 8 years of experience.
        </Card.Body>
        <Card.Footer testMetaData={{ 'data-testid': 'default-card' }}>Footer text</Card.Footer>
      </>
    ),
  },
};

export const WithImage: Story = {
  name: 'Card with Image',
  args: {
    label: 'Featured Artist',
    elevation: 'md',
    interactive: true,
    imageUrl:
      'https://visualartspassage.com/wp-content/uploads/2022/03/ee739b69-5b4c-4f06-8f93-4808a4817276_auto_x2.jpg',
    imageAlt: 'Art portrait',
    testMetaData: { 'data-testid': 'image-card' },
    children: (
      <>
        <Card.Header testMetaData={{ 'data-testid': 'image-card' }}>Art by Jane Doe</Card.Header>
        <Card.Body testMetaData={{ 'data-testid': 'image-card' }}>
          A contemporary piece showcasing vivid strokes and emotion.
        </Card.Body>
        <Card.Footer testMetaData={{ 'data-testid': 'image-card' }}>
          <Button size="sm" variant="primary">
            View Gallery
          </Button>
        </Card.Footer>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Card with an image header. Use `imageUrl` for dynamic or featured content.',
      },
      source: {
        code: `
<Card
  imageUrl="https://example.com/image.jpg"
  label="Featured"
  elevation="md"
  interactive
>
  <Card.Header>Header</Card.Header>
  <Card.Body>Content</Card.Body>
  <Card.Footer>
    <Button>Click</Button>
  </Card.Footer>
</Card>
        `.trim(),
      },
    },
  },
};

export const WithButtons: Story = {
  name: 'Card with Buttons',
  args: {
    label: 'Approval',
    elevation: 'lg',
    interactive: true,
    testMetaData: { 'data-testid': 'approval-card' },
    children: (
      <>
        <Card.Header testMetaData={{ 'data-testid': 'approval-card' }}>
          Approve this request?
        </Card.Header>
        <Card.Body testMetaData={{ 'data-testid': 'approval-card' }}>
          The user submitted a request that needs your approval.
        </Card.Body>
        <Card.Footer testMetaData={{ 'data-testid': 'approval-card' }}>
          <Button
            variant="primary"
            size="md"
            testMetaData={{ 'data-testid': 'approval-card-approve' }}
          >
            Approve
          </Button>
          <Button
            variant="secondary"
            size="md"
            testMetaData={{ 'data-testid': 'approval-card-reject' }}
          >
            Reject
          </Button>
        </Card.Footer>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: `A common pattern is using the Card footer to contain primary and secondary actions.`,
      },
      source: {
        code: `
<Card label="Approval">
  <Card.Header>Approve this request?</Card.Header>
  <Card.Body>The user submitted a request that needs your approval.</Card.Body>
  <Card.Footer>
    <Button variant="primary">Approve</Button>
    <Button variant="secondary">Reject</Button>
  </Card.Footer>
</Card>
        `.trim(),
      },
    },
  },
};

export const Minimal: Story = {
  name: 'Minimal (No Label)',
  args: {
    elevation: 'sm',
    interactive: false,
    testMetaData: { 'data-testid': 'minimal-card' },
    children: (
      <>
        <Card.Body testMetaData={{ 'data-testid': 'minimal-card' }}>
          A card can be as simple as just body content.
        </Card.Body>
      </>
    ),
  },
};

export const Interactive: Story = {
  name: 'Interactive Hoverable',
  args: {
    label: 'Hover Card',
    elevation: 'md',
    interactive: true,
    testMetaData: { 'data-testid': 'hover-card' },
    children: (
      <>
        <Card.Header testMetaData={{ 'data-testid': 'hover-card' }}>Hover me!</Card.Header>
        <Card.Body testMetaData={{ 'data-testid': 'hover-card' }}>
          This card adds a shadow when hovered.
        </Card.Body>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: `Use \`interactive\` to apply a hover effect with elevation.`,
      },
      source: {
        code: `
<Card label="Hover Card" interactive>
  <Card.Header>Hover me!</Card.Header>
  <Card.Body>This card adds a shadow when hovered.</Card.Body>
</Card>
        `.trim(),
      },
    },
  },
};
