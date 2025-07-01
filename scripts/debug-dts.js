import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function debugDts() {
  const distDir = path.resolve(__dirname, '../dist');

  console.log('🔍 Debugging DTS generation...\n');

  if (!fs.existsSync(distDir)) {
    console.error("❌ Dist directory doesn't exist");
    return;
  }

  console.log('📁 Contents of dist directory:');
  const distContents = fs.readdirSync(distDir, { withFileTypes: true });

  distContents.forEach((item) => {
    if (item.isDirectory()) {
      console.log(`  📁 ${item.name}/`);
      const subDir = path.join(distDir, item.name);
      const subContents = fs.readdirSync(subDir);
      subContents.forEach((subItem) => {
        console.log(`    📄 ${subItem}`);
      });
    } else {
      console.log(`  📄 ${item.name}`);
    }
  });

  // Check specifically for index-related files
  console.log('\n🔍 Looking for index-related files:');
  const indexFiles = distContents.filter(
    (item) => item.name.includes('index') || item.name === 'index',
  );

  indexFiles.forEach((item) => {
    console.log(`  Found: ${item.name} (${item.isDirectory() ? 'directory' : 'file'})`);
  });

  // Check if there's a loose index.d.ts at root
  const rootIndexDts = path.join(distDir, 'index.d.ts');
  if (fs.existsSync(rootIndexDts)) {
    console.log('\n✅ Found index.d.ts at root - this should be moved to index/');
    const content = fs.readFileSync(rootIndexDts, 'utf-8');
    console.log('Content preview:', content.substring(0, 200) + '...');
  } else {
    console.log('\n❌ No index.d.ts found at root');
  }

  // Check index directory
  const indexDir = path.join(distDir, 'index');
  if (fs.existsSync(indexDir)) {
    console.log('\n📁 Index directory contents:');
    const indexContents = fs.readdirSync(indexDir);
    indexContents.forEach((file) => {
      console.log(`  📄 ${file}`);
    });
  } else {
    console.log('\n❌ No index directory found');
  }
}

debugDts();
