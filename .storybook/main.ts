/** @type { import('@storybook/nextjs-vite').StorybookConfig } */
const config = {
  stories: ["../stories/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    // "@storybook/addon-interactions",
    // "@storybook/addon-onboarding",
    // "@chromatic-com/storybook",
    "@storybook/addon-docs",
    // "@storybook/addon-a11y",
    // "@storybook/addon-vitest",
  ],
  framework: {
    name: "@storybook/nextjs-vite",
    options: {},
  },
};
export default config;
