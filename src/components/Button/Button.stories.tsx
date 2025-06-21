import { Button } from './Button';
import type { Meta, StoryObj } from '@storybook/react';

import { ArrowLeft, Loader2 } from 'lucide-react';

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

export const Default: Story = {};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Button.Icon>
          <ArrowLeft />
        </Button.Icon>
        Back
      </>
    ),
  },
};

export const IconOnly: Story = {
  args: {
    iconOnly: true,
    children: (
      <Button.Icon>
        <ArrowLeft />
      </Button.Icon>
    ),
    'aria-label': 'Back',
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: 'Loading...',
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
