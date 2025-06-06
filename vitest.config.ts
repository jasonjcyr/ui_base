// vitest.config.ts
import { defineConfig } from 'vitest/config';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    name: 'storybook',
    environment: 'jsdom',
    setupFiles: [path.resolve(dirname, '.storybook/vitest.setup.ts')],
  },
  plugins: [storybookTest({ configDir: path.resolve(dirname, '.storybook') })],
});
