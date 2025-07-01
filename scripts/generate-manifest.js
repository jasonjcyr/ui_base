import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function generateManifest() {
  const tempDir = path.resolve(__dirname, '../.temp');
  const distDir = path.resolve(__dirname, '../dist');
  const componentDataPath = path.join(tempDir, 'component-data.json');

  // Ensure dist directory exists
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  // Read component data if it exists
  let componentData = {
    components: [],
    utilities: [],
    totalExports: 0,
    generatedAt: new Date().toISOString(),
  };

  if (fs.existsSync(componentDataPath)) {
    componentData = JSON.parse(fs.readFileSync(componentDataPath, 'utf-8'));
  }

  // Generate component manifest
  const manifest = {
    ...componentData,
    buildCompletedAt: new Date().toISOString(),
  };

  fs.writeFileSync(
    path.resolve(distDir, 'component-manifest.json'),
    JSON.stringify(manifest, null, 2),
  );

  console.log(`📋 Component manifest generated with ${manifest.totalExports} exports`);

  // Clean up temp directory
  if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}

generateManifest();
