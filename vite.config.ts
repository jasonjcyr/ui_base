import react from '@vitejs/plugin-react';

import path from 'node:path';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import cssInjected from 'vite-plugin-css-injected-by-js';
import dts from 'vite-plugin-dts';
import { externalizeDeps } from 'vite-plugin-externalize-deps';

const isAnalyze = process.env.ANALYZE === 'true';

export default defineConfig({
  plugins: [
    react(),
    dts({ insertTypesEntry: true }),
    externalizeDeps({ except: [] }),
    cssInjected(),
    ...(isAnalyze ? [visualizer({ open: false, filename: './stats.html', gzipSize: true })] : []),
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
          'react/jsx-runtime': 'jsxRuntime',
          clsx: 'clsx',
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
