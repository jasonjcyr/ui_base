import type { Preview } from '@storybook/react';

import '../src/styles/global.scss';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#111827' },
      ],
    },
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme',
      defaultValue: 'light',
      toolbar: {
        icon: 'mirror',
        items: ['light', 'dark'],
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme;

      // Set data-theme attribute or class
      document.documentElement.setAttribute('data-theme', theme);

      // Set canvas background dynamically
      const backgroundValue = theme === 'dark' ? '#111827' : '#ffffff';
      document.body.style.backgroundColor = backgroundValue;

      return Story();
    },
  ],
};

export default preview;
