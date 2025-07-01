import react from '@vitejs/plugin-react';

import fs from 'fs';
import path from 'node:path';
import { visualizer } from 'rollup-plugin-visualizer';
import { type Plugin, defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { externalizeDeps } from 'vite-plugin-externalize-deps';

const isAnalyze = process.env.ANALYZE === 'true';

function getComponentEntries(): Record<string, string> {
  const baseDir = path.resolve(__dirname, 'src/components');
  const srcDir = path.resolve(__dirname, 'src');

  if (!fs.existsSync(baseDir)) {
    throw new Error(`Components directory not found: ${baseDir}`);
  }

  const entries = fs
    .readdirSync(baseDir)
    .filter((name) => {
      const componentPath = path.join(baseDir, name);
      const indexPath = path.join(componentPath, 'index.ts');
      return fs.statSync(componentPath).isDirectory() && fs.existsSync(indexPath);
    })
    .reduce(
      (acc, name) => {
        acc[name] = path.posix.join('src/components', name, 'index.ts');
        return acc;
      },
      {} as Record<string, string>,
    );

  // Add main entry point
  const mainIndexPath = path.join(srcDir, 'index.ts');
  if (fs.existsSync(mainIndexPath)) {
    entries.index = 'src/index.ts';
  }

  // Add utility entries
  const utilityDirs = [
    { name: 'interfaceCollection', path: 'src/interfaceCollection/index.ts' },
    { name: 'tools', path: 'src/tools/index.ts' },
    { name: 'hooks', path: 'src/hooks/index.ts' },
    { name: 'utils', path: 'src/utils/index.ts' },
    { name: 'constants', path: 'src/constants/index.ts' },
    { name: 'themes', path: 'src/themes/index.ts' },
  ];

  utilityDirs.forEach(({ name, path: utilityPath }) => {
    const fullPath = path.resolve(__dirname, utilityPath);
    if (fs.existsSync(fullPath)) {
      entries[name] = utilityPath;
      console.log(`✅ Found utility: ${name}`);
    }
  });

  console.log(`📦 Found ${Object.keys(entries).length} total entries:`, Object.keys(entries));

  return entries;
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

      try {
        const cssFiles = fs.readdirSync(distDir).filter((f) => f.endsWith('.css'));

        cssFiles.forEach((file) => {
          const baseName = file.replace(/\.css$/, '');
          const srcPath = path.join(distDir, file);
          const destDir = path.join(distDir, baseName);
          const destPath = path.join(destDir, 'index.css');

          if (fs.existsSync(destDir) && fs.statSync(destDir).isDirectory()) {
            fs.renameSync(srcPath, destPath);
            console.log(`✅ Moved ${file} to ${baseName}/index.css`);
          } else {
            console.warn(`⚠️ Could not find folder for CSS file: ${file}`);
          }
        });
      } catch (error) {
        console.error('❌ Error processing CSS files:', error);
      }
    },
  };
}

function relocateTypeDefinitionsPlugin(): Plugin {
  return {
    name: 'relocate-type-definitions',
    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist');

      if (!fs.existsSync(distDir)) {
        console.warn(`⚠️ dist directory does not exist: ${distDir}`);
        return;
      }

      try {
        // Handle index.d.ts specially - move it to index folder
        const indexDtsPath = path.join(distDir, 'index.d.ts');
        if (fs.existsSync(indexDtsPath)) {
          const indexDir = path.join(distDir, 'index');
          if (!fs.existsSync(indexDir)) {
            fs.mkdirSync(indexDir, { recursive: true });
          }
          const newIndexDtsPath = path.join(indexDir, 'index.d.ts');
          fs.renameSync(indexDtsPath, newIndexDtsPath);
          console.log(`✅ Moved index.d.ts to index/index.d.ts`);
        }

        // Get all other .d.ts files at root level
        const dtsFiles = fs
          .readdirSync(distDir)
          .filter((f) => f.endsWith('.d.ts') && f !== 'index.d.ts');

        dtsFiles.forEach((file) => {
          const componentName = file.replace('.d.ts', '');
          const srcPath = path.join(distDir, file);
          const destDir = path.join(distDir, componentName);
          const destPath = path.join(destDir, 'index.d.ts');

          if (fs.existsSync(destDir) && fs.statSync(destDir).isDirectory()) {
            // Read the content of the .d.ts file
            let content = fs.readFileSync(srcPath, 'utf-8');

            // Fix relative import paths
            content = content.replace(/from\s+['"]\.\/([^'"]+)['"]/g, "from '../$1'");
            content = content.replace(/import\s+['"]\.\/([^'"]+)['"]/g, "import '../$1'");
            content = content.replace(
              /export\s+\*\s+from\s+['"]\.\/([^'"]+)['"]/g,
              "export * from '../$1'",
            );
            content = content.replace(
              /export\s+\{[^}]+\}\s+from\s+['"]\.\/([^'"]+)['"]/g,
              (match) => match.replace(/\.\//, '../'),
            );

            // Write the fixed content to the new location
            fs.writeFileSync(destPath, content);

            // Remove the original file
            fs.unlinkSync(srcPath);

            console.log(`✅ Moved and fixed ${file} to ${componentName}/index.d.ts`);
          } else {
            console.warn(`⚠️ Could not find folder for type definition: ${file}`);
          }
        });
      } catch (error) {
        console.error('❌ Error processing type definitions:', error);
      }
    },
  };
}

function bundleAnalyzerPlugin(): Plugin {
  return {
    name: 'bundle-analyzer',
    closeBundle() {
      if (isAnalyze) {
        console.log('📊 Bundle analysis will be generated at: ./bundle-analysis.html');
        console.log('📊 Open the file in your browser to view the analysis');
      }
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    externalizeDeps({
      include: ['react', 'react-dom', 'react/jsx-runtime'],
    }),
    dts({
      outDir: 'dist',
      entryRoot: 'src',
      include: ['src/**/*'],
      exclude: [
        '**/*.stories.tsx',
        '**/*.test.tsx',
        '**/*.test.ts',
        '**/tests/**',
        '**/__tests__/**',
        'src/styles/**/*',
      ],
      insertTypesEntry: true,
      rollupTypes: false,
      copyDtsFiles: true,
      staticImport: true,
      afterBuild: () => {
        console.log('📝 TypeScript definitions generated');
      },
    }),
    // Always include visualizer, but configure based on ANALYZE flag
    visualizer({
      open: false,
      filename: './bundle-analysis.html',
      gzipSize: true,
      brotliSize: true,
      template: 'treemap',
      title: 'Talon UI Bundle Analysis',
      projectRoot: __dirname,
    }),
    bundleAnalyzerPlugin(),
    relocateAndRenameCssPlugin(),
    relocateTypeDefinitionsPlugin(),
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
      external: ['react', 'react-dom', 'react/jsx-runtime', 'clsx'],
      output: {
        exports: 'named',
        entryFileNames: '[name]/index.js',
        chunkFileNames: 'shared/[name].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            const name = assetInfo.name.replace('.css', '');
            return `${name}/index.css`;
          }
          return 'assets/[name][extname]';
        },
      },
      treeshake: {
        moduleSideEffects: (id) => {
          if (id.includes('.module.scss')) return false;
          if (id.endsWith('.css') || id.endsWith('.scss')) return true;
          return false;
        },
      },
    },
    outDir: 'dist',
    cssCodeSplit: true,
    minify: 'esbuild',
    sourcemap: true,
    chunkSizeWarningLimit: 500,
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@interfaces': path.resolve(__dirname, 'src/interfaceCollection'),
      '@tools': path.resolve(__dirname, 'src/tools'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@constants': path.resolve(__dirname, 'src/constants'),
      '@themes': path.resolve(__dirname, 'src/themes'),
    },
  },

  optimizeDeps: {
    exclude: ['react', 'react-dom'],
  },
});
