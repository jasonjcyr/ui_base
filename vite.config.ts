import react from '@vitejs/plugin-react';

import path from 'node:path';
import { defineConfig } from 'vite';
import cssInjected from 'vite-plugin-css-injected-by-js';
import dts from 'vite-plugin-dts';
import { externalizeDeps } from 'vite-plugin-externalize-deps';

const isCI = false; // process.env.CI === 'true';

let visualizer;
try {
  // Only require if not in CI and the package is installed
  if (!isCI) {
    visualizer = require('rollup-plugin-visualizer').visualizer;
  }
} catch {
  visualizer = () => null;
}

export default defineConfig({
  plugins: [
    react(),
    dts({ insertTypesEntry: true }),
    externalizeDeps({ except: [] }),
    cssInjected(),
    !isCI && visualizer({ open: false }),
  ].filter(Boolean),
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'MyUILib',
      formats: ['es', 'umd'],
      fileName: (format) => `my-ui-lib.${format}.js`,
    },
    rollupOptions: {
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
  css: {
    modules: {
      scopeBehaviour: 'local',
    },
    preprocessorOptions: {
      scss: {},
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@styles': path.resolve(__dirname, 'styles'),
    },
  },
});
