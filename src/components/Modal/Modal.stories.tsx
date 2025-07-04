'use client';

import { Modal } from './Modal';
import type { Meta, StoryObj } from '@storybook/react';

import { useState } from 'react';

import { Button } from '@/components/Button';
import { Typography } from '@/components/Typography';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    docs: {
      description: {
        component: `
Modals present content in a layer above the app, requiring user interaction before continuing.

---

✅ **When to use**
- Confirming a user action (e.g. delete, submit)
- Displaying complex content without navigating away
- Presenting contextual forms or information

---

🔧 **Usage**
- Use \`isOpen\` to control visibility
- Use \`onClose\` to handle dismiss actions
- Use compound components for structure

---

🧩 **Compound API**
The Modal supports the following structure:

\`\`\`tsx
<Modal isOpen={isOpen} onClose={handleClose}>
  <Modal.Overlay />
  <Modal.Content>
    <Modal.Header>Title</Modal.Header>
    <Modal.Body>Body content</Modal.Body>
    <Modal.Footer>Actions</Modal.Footer>
  </Modal.Content>
</Modal>
\`\`\`

---

🧬 **Testing**
Use \`testMetaData\` to pass base test IDs. Each section will receive a suffix automatically:

- \`-Modal\`
- \`-Header\`
- \`-Body\`
- \`-Footer\`
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  name: 'Default Modal',
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          testMetaData={{ 'data-testid': 'default-modal' }}
        >
          <Modal.Overlay />
          <Modal.Content>
            <Modal.Header>Confirm Action</Modal.Header>
            <Modal.Body>Are you sure you want to proceed with this action?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary">Confirm</Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </>
    );
  },
};

export const WithLongContent: Story = {
  name: 'Modal with Long Content',
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Long Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          testMetaData={{ 'data-testid': 'long-modal' }}
        >
          <Modal.Overlay />
          <Modal.Content>
            <Modal.Header>Terms and Conditions</Modal.Header>
            <Modal.Body>
              <Typography variant="body">
                {Array(20)
                  .fill(
                    'This is a paragraph inside a long modal body to simulate scrollable content.',
                  )
                  .join(' ')}
              </Typography>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={() => setIsOpen(false)}>
                Agree
              </Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </>
    );
  },
};

export const WithForm: Story = {
  name: 'Modal with Form',
  render: () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Form Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          testMetaData={{ 'data-testid': 'form-modal' }}
        >
          <Modal.Overlay onClick={() => setIsOpen(false)} />
          <Modal.Content>
            <Modal.Header>Contact Us</Modal.Header>
            <Modal.Body>
              <form className="form">
                <div style={{ marginBottom: '1rem' }}>
                  <label htmlFor="email" style={{ display: 'block', marginBottom: '0.25rem' }}>
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    style={{ width: '100%', padding: '0.5rem' }}
                  />
                </div>
                <div>
                  <label htmlFor="message" style={{ display: 'block', marginBottom: '0.25rem' }}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Your message..."
                    style={{ width: '100%', padding: '0.5rem' }}
                  />
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary">Send</Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </>
    );
  },
};

export const CloseOnly: Story = {
  name: 'Modal with Close Button Only',
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Simple Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          testMetaData={{ 'data-testid': 'close-only-modal' }}
        >
          <Modal.Overlay />
          <Modal.Content>
            <Modal.Body>
              <Typography variant="body">
                This modal only has content and a close button.
              </Typography>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={() => setIsOpen(false)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </>
    );
  },
};
