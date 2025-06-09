/** @type { import('@storybook/nextjs-vite').StorybookConfig } */
const config = {
  stories: ['../stories/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-docs',
    // '@storybook/addon-viewport',
    // '@storybook/addon-designs',
    // '@storybook/addon-a11y', // Optional
    // '@storybook/addon-interactions',
    // '@storybook/addon-onboarding',
    // '@storybook/addon-vitest',
  ],
  framework: {
    name: '@storybook/nextjs-vite',
    options: {},
  },
};
export default config;
