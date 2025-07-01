import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function verifyBuild() {
  const distDir = path.resolve(__dirname, '../dist');
  const packageJsonPath = path.resolve(__dirname, '../package.json');

  if (!fs.existsSync(distDir)) {
    console.error('❌ Dist directory not found. Run build first.');
    process.exit(1);
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
  const exports = packageJson.exports || {};

  let errors = 0;
  let warnings = 0;

  console.log('🔍 Verifying build output...\n');

  // Verify each export exists
  Object.entries(exports).forEach(([exportPath, config]) => {
    if (exportPath === './package.json') return;

    const typesPath = path.resolve(__dirname, '..', config.types);
    const importPath = path.resolve(__dirname, '..', config.import);
    const stylePath = config.style ? path.resolve(__dirname, '..', config.style) : null;

    console.log(`Checking ${exportPath}:`);

    if (!fs.existsSync(typesPath)) {
      console.error(`  ❌ Missing types file: ${config.types}`);
      errors++;
    } else {
      console.log(`  ✅ Types: ${config.types}`);
    }

    if (!fs.existsSync(importPath)) {
      console.error(`  ❌ Missing import file: ${config.import}`);
      errors++;
    } else {
      console.log(`  ✅ Import: ${config.import}`);
    }

    if (stylePath) {
      if (!fs.existsSync(stylePath)) {
        console.warn(`  ⚠️  Missing style file: ${config.style}`);
        warnings++;
      } else {
        console.log(`  ✅ Style: ${config.style}`);
      }
    }

    console.log('');
  });

  if (errors === 0 && warnings === 0) {
    console.log(
      `🎉 Build verification passed! All ${Object.keys(exports).length - 1} exports are valid.`,
    );
  } else if (errors === 0) {
    console.warn(`⚠️  Build verification completed with ${warnings} warnings.`);
  } else {
    console.error(`💥 Build verification failed with ${errors} errors and ${warnings} warnings.`);
    process.exit(1);
  }
}

verifyBuild();
