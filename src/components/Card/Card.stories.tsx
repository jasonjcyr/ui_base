import { Card } from "./Card";
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Cards are flexible content containers that can be used to display a variety of information in a structured way.
        `,
      }
    }
  },
  args: {
    heading: 'Determinism',
    children: 'The doctrine that all events, including human action, are ultimately determined by causes regarded as external to the will.',
    backgroundColor: 'white',
    callToActions: [{
      variant: 'ghost',
      size: 'sm',
      disabled: false,
      loading: false,
      fullWidth: false,
      iconOnly: false,
      destructive: false,
      children: 'LEARN MORE',
    },],
    image: {
      url: 'https://visualartspassage.com/wp-content/uploads/2022/03/ee739b69-5b4c-4f06-8f93-4808a4817276_auto_x2.jpg',
      description: 'Placeholder image',
    },
  }
}

export default meta;
type Story = StoryObj<typeof Card>;

// Default story
export const Default: Story = {
  parameters: {
    docs: {
      source: { code: `<Card>Say Hello</Card>` },
    },
  },
};