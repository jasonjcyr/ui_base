module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-preset-env': {
      stage: 1,
      features: {
        'custom-media-queries': true,
      },
    },
    cssnano: {
      preset: [
        'default',
        {
          discardComments: { removeAll: true },
          reduceInitial: true,
          mergeLonghand: true,
          cssDeclarationSorter: true,
        },
      ],
    },
    autoprefixer: {},
  },
};
