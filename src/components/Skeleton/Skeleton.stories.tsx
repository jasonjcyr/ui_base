import { Skeleton } from './Skeleton';
import { Meta, StoryObj } from '@storybook/react';

import { Card } from '../Card';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Text: Story = {
  args: {
    variant: 'text',
    width: '200px',
    testMetaData: {
      'data-testid': 'skeleton-text',
    },
  },
};

export const Circle: Story = {
  args: {
    variant: 'circle',
    width: '40px',
    height: '40px',
    testMetaData: {
      'data-testid': 'skeleton-circle',
    },
  },
};

export const Rectangular: Story = {
  args: {
    variant: 'rectangular',
    width: '300px',
    height: '100px',
    testMetaData: {
      'data-testid': 'skeleton-rect',
    },
  },
};

export const WithCard: Story = {
  render: () => (
    <Card label="Loading Card" testMetaData={{ 'data-testid': 'card-loading' }}>
      <Card.Body>
        <Skeleton variant="text" width="60%" testMetaData={{ 'data-testid': 'skeleton-title' }} />
        <Skeleton
          variant="rectangular"
          width="100%"
          height="80px"
          testMetaData={{ 'data-testid': 'skeleton-body' }}
        />
      </Card.Body>
    </Card>
  ),
};
