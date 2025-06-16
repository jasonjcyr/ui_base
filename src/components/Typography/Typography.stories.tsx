import { Typography } from './Typography';
import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';

const meta: Meta<typeof Typography> = {
  title: 'Design System/Typography',
  component: Typography,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'body', 'caption'],
    },
    as: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'p', 'span', 'div'],
    },
    children: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Playground: Story = {
  args: {
    variant: 'body',
    as: 'p',
    children: 'The quick brown fox jumps over the lazy dog.',
  },
};

export const AllVariants: Story = {
  render: () => (
    <>
      <Typography variant="h1" as="h1">
        Heading 1
      </Typography>
      <Typography variant="h2" as="h2">
        Heading 2
      </Typography>
      <Typography variant="body" as="p">
        Body Text
      </Typography>
      <Typography variant="caption" as="small">
        Caption Text
      </Typography>
    </>
  ),
};
