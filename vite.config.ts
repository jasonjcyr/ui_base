import react from '@vitejs/plugin-react';

import fs from 'fs';
import path from 'node:path';
import { visualizer } from 'rollup-plugin-visualizer';
import { Plugin, defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { externalizeDeps } from 'vite-plugin-externalize-deps';

const isAnalyze = process.env.ANALYZE === 'true';

function getComponentEntries(): Record<string, string> {
  const baseDir = path.resolve(__dirname, 'src/components');
  if (!fs.existsSync(baseDir)) {
    throw new Error(`Components directory not found: ${baseDir}`);
  }
  return Object.fromEntries(
    fs
      .readdirSync(baseDir)
      .filter(
        (name) =>
          fs.statSync(path.join(baseDir, name)).isDirectory() &&
          fs.existsSync(path.join(baseDir, name, 'index.ts')),
      )
      .map((name) => [name, path.posix.join('src/components', name, 'index.ts')]),
  );
}

function relocateAndRenameCssPlugin(): Plugin {
  return {
    name: 'relocate-css',
    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist');
      if (!fs.existsSync(distDir)) {
        console.warn(`⚠️ dist directory does not exist: ${distDir}`);
        return;
      }
      const cssFiles = fs.readdirSync(distDir).filter((f) => f.endsWith('.css'));
      cssFiles.forEach((file) => {
        const baseName = file.replace(/\.css$/, '');
        const srcPath = path.join(distDir, file);
        const destDir = path.join(distDir, baseName);
        const destPath = path.join(destDir, 'index.css');
        if (fs.existsSync(destDir)) {
          fs.renameSync(srcPath, destPath);
        } else {
          console.warn(`⚠️ Could not find folder for CSS file: ${file}`);
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    externalizeDeps(),
    dts({
      outDir: 'dist',
      entryRoot: 'src',
      include: ['src'],
      exclude: ['**/*.stories.ts', '**/*.test.tsx', '**/*.test.ts', '**/*.stories.tsx'],
      insertTypesEntry: true,
    }),
    ...(isAnalyze
      ? [
          visualizer({
            open: false,
            filename: './stats.html',
            gzipSize: true,
          }),
        ]
      : []),
    relocateAndRenameCssPlugin(),
  ],
  css: {
    modules: {
      scopeBehaviour: 'local',
      generateScopedName: '[name]__[local]___[hash:base64:5]',
    },
    preprocessorOptions: {
      scss: {},
    },
  },
  build: {
    lib: {
      entry: getComponentEntries(),
      formats: ['es'],
      fileName: (format, name) => `${name}/index.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'clsx', 'react/jsx-runtime'],
      output: {},
      treeshake: {
        moduleSideEffects: (id) => {
          if (id.endsWith('.module.scss')) return false;
          return null;
        },
      },
    },
    outDir: 'dist',
    cssCodeSplit: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@styles': path.resolve(__dirname, 'styles'),
    },
  },
});
