'use client';

import { Tabs } from './Tabs';
import './Tabs.stories.scss';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    docs: {
      description: {
        component: `
Tabs let users switch between related content sections in the same view.

---

✅ **When to use**
- Organizing content into logical sections
- Dashboards, forms, or multi-step flows
- Avoiding excessive scrolling

---

🧭 **Accessibility**
- Fully keyboard-navigable
- Uses correct ARIA roles: \`tab\`, \`tablist\`, and \`tabpanel\`

---

🧬 **Compound Component API**

\`Tabs.TabList\` – wrapper for \`Tab\` items
\`Tabs.Tab\` – a single tab button
\`Tabs.TabPanels\` – wrapper for \`TabPanel\`s
\`Tabs.TabPanel\` – content shown when tab is active

---

✍️ **Content guidelines**
- Keep labels concise
- Avoid wrapping long text in tabs
- Use consistent ordering and terminology
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const BasicTabs: Story = {
  render: () => (
    <Tabs testMetaData={{ 'data-testid': 'Tabs-Basic' }}>
      <Tabs.TabList>
        <Tabs.Tab>First</Tabs.Tab>
        <Tabs.Tab>Second</Tabs.Tab>
        <Tabs.Tab>Third</Tabs.Tab>
      </Tabs.TabList>
      <Tabs.TabPanels>
        <Tabs.TabPanel>
          <p>This is the first panel.</p>
        </Tabs.TabPanel>
        <Tabs.TabPanel>
          <p>This is the second panel.</p>
        </Tabs.TabPanel>
        <Tabs.TabPanel>
          <p>This is the third panel.</p>
        </Tabs.TabPanel>
      </Tabs.TabPanels>
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic usage with three tabs and simple panel content.',
      },
    },
  },
};

export const FormTabs: Story = {
  render: () => (
    <Tabs testMetaData={{ 'data-testid': 'Tabs-Form' }}>
      <Tabs.TabList>
        <Tabs.Tab>Account</Tabs.Tab>
        <Tabs.Tab>Security</Tabs.Tab>
      </Tabs.TabList>
      <Tabs.TabPanels>
        <Tabs.TabPanel>
          <label>
            Email
            <input type="email" placeholder="you@example.com" />
          </label>
        </Tabs.TabPanel>
        <Tabs.TabPanel>
          <label>
            Password
            <input type="password" placeholder="••••••••" />
          </label>
        </Tabs.TabPanel>
      </Tabs.TabPanels>
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tabs can be used in forms to separate input sections.',
      },
    },
  },
};

export const ManyTabs: Story = {
  render: () => (
    <Tabs testMetaData={{ 'data-testid': 'Tabs-Many' }}>
      <Tabs.TabList>
        {Array.from({ length: 10 }, (_, i) => (
          <Tabs.Tab key={i}>Tab {i + 1}</Tabs.Tab>
        ))}
      </Tabs.TabList>
      <Tabs.TabPanels>
        {Array.from({ length: 10 }, (_, i) => (
          <Tabs.TabPanel key={i}>
            <p>Panel content for tab {i + 1}</p>
          </Tabs.TabPanel>
        ))}
      </Tabs.TabPanels>
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Responsive behavior with many tabs is important for mobile support.',
      },
    },
  },
};

export const DarkTheme: Story = {
  render: () => (
    <div className="dark" style={{ backgroundColor: '#111', padding: '2rem' }}>
      <Tabs testMetaData={{ 'data-testid': 'Tabs-Dark' }}>
        <Tabs.TabList>
          <Tabs.Tab>One</Tabs.Tab>
          <Tabs.Tab>Two</Tabs.Tab>
        </Tabs.TabList>
        <Tabs.TabPanels>
          <Tabs.TabPanel>
            <p style={{ color: 'white' }}>Dark theme panel one</p>
          </Tabs.TabPanel>
          <Tabs.TabPanel>
            <p style={{ color: 'white' }}>Dark theme panel two</p>
          </Tabs.TabPanel>
        </Tabs.TabPanels>
      </Tabs>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates tabs on a dark background.',
      },
    },
  },
};
