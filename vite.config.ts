import react from '@vitejs/plugin-react';

import path from 'node:path';
import { defineConfig } from 'vite';
import cssInjected from 'vite-plugin-css-injected-by-js';
import dts from 'vite-plugin-dts';
import { externalizeDeps } from 'vite-plugin-externalize-deps';

export default defineConfig({
  plugins: [
    react(),
    dts({ insertTypesEntry: true }),
    externalizeDeps({ except: [] }),
    cssInjected(),
  ],
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
