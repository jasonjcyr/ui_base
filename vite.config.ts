import react from '@vitejs/plugin-react';

import fs from 'fs';
import path from 'node:path';
import { visualizer } from 'rollup-plugin-visualizer';
import { type Plugin, defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { externalizeDeps } from 'vite-plugin-externalize-deps';

const isAnalyze = process.env.ANALYZE === 'true';
const isBuild = process.env.BUILD === 'true';

function getComponentEntries(): Record<string, string> {
  const baseDir = path.resolve(__dirname, 'src/components');
  const srcDir = path.resolve(__dirname, 'src');
  const entries: Record<string, string> = {};

  if (!fs.existsSync(baseDir)) {
    console.warn(`⚠️ Components directory not found: ${baseDir}`);
    return entries;
  }

  fs.readdirSync(baseDir).forEach((name) => {
    const componentPath = path.join(baseDir, name);
    const indexPath = path.join(componentPath, 'index.ts');
    if (fs.statSync(componentPath).isDirectory() && fs.existsSync(indexPath)) {
      entries[name] = path.posix.join('src/components', name, 'index.ts');
      console.log(`✅ Found component: ${name}`);
    }
  });

  const mainIndexPath = path.join(srcDir, 'index.ts');
  if (fs.existsSync(mainIndexPath)) {
    entries.index = 'src/index.ts';
    console.log('✅ Found root index.ts');
  }

  const utilities = [
    { name: 'interfaceCollection', path: 'src/interfaceCollection/index.ts' },
    { name: 'tools', path: 'src/tools/index.ts' },
    { name: 'hooks', path: 'src/hooks/index.ts' },
    { name: 'utils', path: 'src/utils/index.ts' },
    { name: 'constants', path: 'src/constants/index.ts' },
    { name: 'themes', path: 'src/themes/index.ts' },
  ];

  utilities.forEach(({ name, path: utilPath }) => {
    if (fs.existsSync(utilPath)) {
      entries[name] = utilPath;
      console.log(`✅ Found utility: ${name}`);
    } else {
      console.warn(`⚠️ Missing utility: ${name}`);
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

      const cssFiles = fs.readdirSync(distDir).filter((f) => f.endsWith('.css'));
      cssFiles.forEach((file) => {
        const baseName = file.replace(/\.css$/, '');
        const srcPath = path.join(distDir, file);
        const destDir = path.join(distDir, baseName);
        const destPath = path.join(destDir, 'index.css');

        if (fs.existsSync(destDir)) {
          fs.renameSync(srcPath, destPath);
          console.log(`✅ Moved ${file} to ${baseName}/index.css`);
        } else {
          console.warn(`⚠️ Could not find folder for CSS file: ${file}`);
        }
      });
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

      const indexDtsPath = path.join(distDir, 'index.d.ts');
      const indexDir = path.join(distDir, 'index');
      if (fs.existsSync(indexDtsPath)) {
        fs.mkdirSync(indexDir, { recursive: true });
        fs.renameSync(indexDtsPath, path.join(indexDir, 'index.d.ts'));
        console.log(`✅ Moved index.d.ts to index/index.d.ts`);
      }

      const dtsFiles = fs
        .readdirSync(distDir)
        .filter((f) => f.endsWith('.d.ts') && f !== 'index.d.ts');

      dtsFiles.forEach((file) => {
        const name = file.replace('.d.ts', '');
        const src = path.join(distDir, file);
        const destDir = path.join(distDir, name);
        const dest = path.join(destDir, 'index.d.ts');

        if (fs.existsSync(destDir)) {
          let content = fs.readFileSync(src, 'utf-8');
          content = content.replace(/from\s+['"]\.\/([^'"]+)['"]/g, "from '../$1'");
          content = content.replace(/import\s+['"]\.\/([^'"]+)['"]/g, "import '../$1'");
          content = content.replace(
            /export\s+\*\s+from\s+['"]\.\/([^'"]+)['"]/g,
            "export * from '../$1'",
          );
          content = content.replace(/export\s+\{[^}]+\}\s+from\s+['"]\.\/([^'"]+)['"]/g, (m) =>
            m.replace('./', '../'),
          );

          fs.writeFileSync(dest, content);
          fs.unlinkSync(src);
          console.log(`✅ Moved and fixed ${file} to ${name}/index.d.ts`);
        } else {
          console.warn(`⚠️ Could not find folder for type definition: ${file}`);
        }
      });
    },
  };
}

function bundleAnalyzerPlugin(): Plugin {
  return {
    name: 'bundle-analyzer',
    closeBundle() {
      if (isAnalyze) {
        console.log('📊 Bundle analysis written to ./bundle-analysis.html');
      }
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    ...(isBuild
      ? [
          externalizeDeps({
            include: ['react', 'react-dom', 'react/jsx-runtime'],
          }),
        ]
      : []),
    dts({
      outDir: 'dist',
      entryRoot: 'src',
      include: ['src/**/*'],
      exclude: [
        '**/*.stories.tsx',
        '**/*.test.tsx',
        '**/*.test.ts',
        '**/__tests__/**',
        'src/styles/**/*',
      ],
      insertTypesEntry: true,
      staticImport: true,
      copyDtsFiles: true,
      rollupTypes: false,
    }),
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
        assetFileNames: (assetInfo) =>
          assetInfo.name?.endsWith('.css')
            ? `${assetInfo.name.replace('.css', '')}/index.css`
            : 'assets/[name][extname]',
      },
      treeshake: {
        moduleSideEffects: (id) =>
          id.includes('.module.scss') ? false : id.endsWith('.css') || id.endsWith('.scss'),
      },
    },
    outDir: 'dist',
    cssCodeSplit: true,
    minify: 'esbuild',
    sourcemap: true,
    chunkSizeWarningLimit: 500,
  },

  css: {
    modules: {
      scopeBehaviour: 'local',
      generateScopedName: '[name]__[local]___[hash:base64:5]',
    },
    preprocessorOptions: {
      scss: {},
    },
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
    exclude: isBuild ? ['react', 'react-dom'] : [],
  },
});
