import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function scanDirectory(dirPath, basePath = '') {
  const items = [];

  if (!fs.existsSync(dirPath)) {
    return items;
  }

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const fullPath = path.join(dirPath, entry.name);
      const indexPath = path.join(fullPath, 'index.ts');

      if (fs.existsSync(indexPath)) {
        const relativePath = basePath ? `${basePath}/${entry.name}` : entry.name;
        items.push({
          name: entry.name,
          path: relativePath,
          fullPath,
          hasIndex: true,
        });
      }

      // Recursively scan subdirectories
      const subItems = scanDirectory(fullPath, basePath ? `${basePath}/${entry.name}` : entry.name);
      items.push(...subItems);
    }
  }

  return items;
}

function generateExports() {
  const srcDir = path.resolve(__dirname, '../src');
  const packageJsonPath = path.resolve(__dirname, '../package.json');

  if (!fs.existsSync(srcDir)) {
    console.error('Source directory not found:', srcDir);
    process.exit(1);
  }

  // Read existing package.json
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

  // Scan for components
  const componentsDir = path.join(srcDir, 'components');
  const components = scanDirectory(componentsDir);

  // Check for main index
  const mainIndexPath = path.join(srcDir, 'index.ts');
  const hasMainIndex = fs.existsSync(mainIndexPath);

  // Scan for other exportable directories
  const utilityDirs = [
    {
      dir: path.join(srcDir, 'interfaceCollection'),
      key: './interfaces',
      name: 'interfaceCollection',
    },
    { dir: path.join(srcDir, 'tools'), key: './tools', name: 'tools' },
    { dir: path.join(srcDir, 'hooks'), key: './hooks', name: 'hooks' },
    { dir: path.join(srcDir, 'utils'), key: './utils', name: 'utils' },
    { dir: path.join(srcDir, 'constants'), key: './constants', name: 'constants' },
    { dir: path.join(srcDir, 'themes'), key: './themes', name: 'themes' },
  ];

  // Generate exports object
  const exports = {};

  // Add main export only if index.ts exists
  if (hasMainIndex) {
    exports['.'] = {
      types: './dist/index/index.d.ts',
      import: './dist/index/index.js',
    };
    console.log('✅ Main index found - adding root export');
  } else {
    console.warn('⚠️ No main index.ts found - skipping root export');
  }

  // Add component exports
  components.forEach((component) => {
    const exportKey = `./${component.path}`;
    exports[exportKey] = {
      types: `./dist/${component.path}/index.d.ts`,
      import: `./dist/${component.path}/index.js`,
      style: `./dist/${component.path}/index.css`,
    };
  });

  // Add utility exports (only if they exist and have index.ts)
  utilityDirs.forEach(({ dir, key, name }) => {
    const indexPath = path.join(dir, 'index.ts');
    if (fs.existsSync(dir) && fs.existsSync(indexPath)) {
      exports[key] = {
        types: `./dist/${name}/index.d.ts`,
        import: `./dist/${name}/index.js`,
      };
      console.log(`✅ Found utility: ${name}`);
    } else {
      console.log(`⚠️ Skipping utility: ${name} (missing index.ts)`);
    }
  });

  // Add package.json export
  exports['./package.json'] = './package.json';

  // Update package.json
  packageJson.exports = exports;

  // Write back to package.json
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');

  console.log(`\n✅ Generated exports for ${components.length} components`);
  components.forEach((component) => {
    console.log(`   - ${component.path}`);
  });

  console.log('\n📦 All export paths:');
  Object.keys(exports).forEach((exportPath) => {
    if (exportPath !== './package.json') {
      console.log(`   ${exportPath}`);
    }
  });

  // Store component data for post-build manifest generation
  const componentData = {
    components,
    utilities: utilityDirs.filter(
      ({ dir }) => fs.existsSync(dir) && fs.existsSync(path.join(dir, 'index.ts')),
    ),
    totalExports: Object.keys(exports).length - 1, // Exclude package.json
    hasMainIndex,
    generatedAt: new Date().toISOString(),
  };

  // Create temp directory for component data
  const tempDir = path.resolve(__dirname, '../.temp');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  fs.writeFileSync(
    path.resolve(tempDir, 'component-data.json'),
    JSON.stringify(componentData, null, 2),
  );

  console.log(`\n📋 Component data prepared for manifest generation`);
}

generateExports();
