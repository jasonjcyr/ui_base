import { Button } from './Button';
import type { Meta, StoryObj } from '@storybook/react';

import { ArrowLeft } from 'lucide-react';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
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
  },
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
    fullWidth: false,
    iconOnly: false,
    children: 'Click Me',
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `<Button>Click Me</Button>`,
      },
    },
  },
};

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
