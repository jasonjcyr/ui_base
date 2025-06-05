const config = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-webpack5-compiler-swc",
    "@storybook/addon-onboarding",
    "@storybook/addon-docs",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.module\.s[ac]ss$/i,
      use: [
        "style-loader",
        {
          loader: "css-loader",
          options: {
            importLoaders: 2,
            esModule: false,
            modules: {
              localIdentName: "[name]__[local]___[hash:base64:5]",
              exportLocalsConvention: "asIs",
            },
          },
        },
        "sass-loader",
      ],
    });

    return config;
  },
};
export default config;
