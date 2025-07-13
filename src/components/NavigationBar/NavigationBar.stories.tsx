'use client';

import { NavigationBar } from './NavigationBar';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof NavigationBar> = {
  title: 'Component/NavigationBar',
  component: NavigationBar,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof NavigationBar>;
export const Default: Story = {
  name: 'Default Navigation Bar',
  args: {
    logo: "http://localhost:6007/talon-ui.webp",
    links: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      
    ],
  },
};
