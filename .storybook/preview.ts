import './storybook-global.scss';
import type { Preview } from '@storybook/react';

import '../src/styles/global.scss';

const setThemeStyles = (theme: string) => {
  document.documentElement.setAttribute('data-theme', theme);

  const backgroundColor = theme === 'dark' ? '#111827' : '#ffffff';
  const textColor = theme === 'dark' ? '#ffffff' : '#000000';
  const canvas = document.querySelector('.sb-show-main') as HTMLElement;

  if (canvas) {
    canvas.style.backgroundColor = backgroundColor;
    canvas.style.color = textColor;
  }

  const docsWrapper = document.querySelector('.sbdocs.sbdocs-wrapper') as HTMLElement;
  if (docsWrapper) {
    docsWrapper.style.backgroundColor = backgroundColor;
    docsWrapper.style.color = textColor;
  }

  document.querySelectorAll('.docs-story').forEach((story) => {
    (story as HTMLElement).style.backgroundColor = backgroundColor;
    (story as HTMLElement).style.color = textColor;
  });
};

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#111827' },
      ],
    },
    docs: {
      theme: undefined, // Use default or your custom theme if you have one
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

      setThemeStyles(theme);

      return Story();
    },
  ],
};

export default preview;
