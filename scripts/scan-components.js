import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function scanComponents() {
  const componentsDir = path.resolve(__dirname, '../src/components');

  if (!fs.existsSync(componentsDir)) {
    console.error('Components directory not found:', componentsDir);
    return;
  }

  function scanDirectory(dirPath, level = 0) {
    const indent = '  '.repeat(level);
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    entries.forEach((entry) => {
      if (entry.isDirectory()) {
        const fullPath = path.join(dirPath, entry.name);
        const indexPath = path.join(fullPath, 'index.ts');
        const hasIndex = fs.existsSync(indexPath);

        console.log(`${indent}📁 ${entry.name} ${hasIndex ? '✅' : '❌'}`);

        if (hasIndex) {
          // Check for common component files
          const componentFile = path.join(fullPath, `${entry.name}.tsx`);
          const styleFile = path.join(fullPath, `${entry.name}.module.scss`);
          const storyFile = path.join(fullPath, `${entry.name}.stories.tsx`);
          const testFile = path.join(fullPath, `${entry.name}.test.tsx`);

          if (fs.existsSync(componentFile)) console.log(`${indent}  📄 ${entry.name}.tsx`);
          if (fs.existsSync(styleFile)) console.log(`${indent}  🎨 ${entry.name}.module.scss`);
          if (fs.existsSync(storyFile)) console.log(`${indent}  📖 ${entry.name}.stories.tsx`);
          if (fs.existsSync(testFile)) console.log(`${indent}  🧪 ${entry.name}.test.tsx`);
        }

        // Recursively scan subdirectories
        scanDirectory(fullPath, level + 1);
      }
    });
  }

  console.log('🔍 Scanning component structure:\n');
  scanDirectory(componentsDir);

  // Count total components
  function countComponents(dirPath) {
    let count = 0;
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    entries.forEach((entry) => {
      if (entry.isDirectory()) {
        const fullPath = path.join(dirPath, entry.name);
        const indexPath = path.join(fullPath, 'index.ts');

        if (fs.existsSync(indexPath)) {
          count++;
        }

        count += countComponents(fullPath);
      }
    });

    return count;
  }

  const totalComponents = countComponents(componentsDir);
  console.log(`\n📊 Total exportable components: ${totalComponents}`);
}

scanComponents();
