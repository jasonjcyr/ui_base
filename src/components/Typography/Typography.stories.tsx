import { Typography } from './Typography';
import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';

const meta: Meta<typeof Typography> = {
  title: 'Components/Typography',
  component: Typography,
  tags: ['autodocs'],
  args: {
    children: 'The quick brown fox jumps over the lazy dog.',
    variant: 'body',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body', 'caption', 'lead', 'overline'],
    },
    as: {
      control: 'select',
      options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'div'],
      description: 'Tag or component to render as',
      table: {
        type: { summary: 'React.ElementType' },
        defaultValue: { summary: 'inferred from variant' },
      },
    },
    className: { control: false },
    testMetadata: { control: false },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem', maxWidth: '600px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Typography>;

// export const Default: Story = {};

export const Default: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: '1rem' }}>
      {['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'lead', 'body', 'caption', 'overline'].map(
        (variant) => (
          <Typography key={variant} {...args} variant={variant as any}>
            {variant.toUpperCase()} - The quick brown fox...
          </Typography>
        ),
      )}
    </div>
  ),
};

export const CustomTag: Story = {
  args: {
    variant: 'body',
    as: 'div',
    children: 'This is rendered as a <div>, but styled as "body".',
  },
};

export const WithTestMetadata: Story = {
  args: {
    variant: 'caption',
    testMetadata: {
      'data-testid': 'typography-caption',
      'data-uitest': 'typography-caption-uitest',
    },
    children: 'Check the HTML output for test metadata.',
  },
};

export const StyledTypography: Story = {
  args: {
    variant: 'lead',
    className: 'custom-class',
    children: 'Styled using a custom external className.',
  },
};
