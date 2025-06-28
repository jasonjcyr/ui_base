import pkg from './package.json' with { type: 'json' };
import react from '@vitejs/plugin-react';

import path from 'node:path';
import generatePackageJson from 'rollup-plugin-generate-package-json';
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
      plugins: [
        generatePackageJson({
          baseContents: () => ({
            name: pkg.name,
            version: pkg.version,
            main: 'my-ui-lib.umd.js',
            module: 'my-ui-lib.es.js',
            types: 'index.d.ts',
            exports: {
              '.': {
                import: './my-ui-lib.es.js',
                require: './my-ui-lib.umd.js',
              },
            },
            sideEffects: ['*.css', '*.scss'],
            peerDependencies: {
              react: '>=18',
              'react-dom': '>=18',
            },
            license: pkg.license,
            publishConfig: pkg.publishConfig,
          }),
        }),
      ],
    },
    outDir: 'dist',
    emptyOutDir: true,
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
