import { dark, light } from './themes';
import type { Preview } from '@storybook/react';

import { useDarkMode } from 'storybook-dark-mode';

import '../src/styles/global.scss';

const themeColors = {
  light: '#ffffff',
  dark: '#222425',
} as const;

const preview: Preview = {
  parameters: {
    darkMode: {
      light,
      dark,
      classTarget: 'html',
      lightClass: 'light',
      darkClass: 'dark',
      stylePreview: true,
    },
    backgrounds: {
      default: 'light',
      values: Object.entries(themeColors).map(([name, value]) => ({
        name,
        value,
      })),
    },
    docs: {
      theme: light,
    },
  },
  decorators: [
    (Story, context) => {
      const isDark = useDarkMode();
      const theme = isDark ? 'dark' : 'light';
      const backgroundValue = themeColors[theme];
      document.documentElement.setAttribute('data-theme', theme);
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);
      document.body.style.backgroundColor = backgroundValue;

      const docsTheme = {
        ...(isDark ? dark : light),
        appBg: backgroundValue,
      };

      context.parameters.docs = {
        ...(context.parameters.docs || {}),
        theme: docsTheme,
      };

      return Story();
    },
  ],
};

export default preview;
