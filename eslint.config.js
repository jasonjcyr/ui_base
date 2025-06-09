import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

import prettierPlugin from 'eslint-plugin-prettier';

export default [
  {
    ignores: ['eslint.config.js'],
  },
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: './tsconfig.eslint.json',
      },
    },
    plugins: {
      '@typescript-eslint': {
        rules: tsPlugin.rules,
      },
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
      semi: ['error', 'always'],
      ...Object.fromEntries(
        Object.entries(tsPlugin.rules)
          .filter(([ruleName]) => ruleName === 'semi')
          .map(([ruleName]) => [`@typescript-eslint/${ruleName}`, ['error', 'always']]),
      ),
    },
  },
];
