import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function analyzeComponents() {
  const distDir = path.resolve(__dirname, '../dist');

  if (!fs.existsSync(distDir)) {
    console.error('❌ Dist directory not found. Run build first.');
    return;
  }

  console.log('📊 Component Size Analysis\n');

  const components = [];
  const entries = fs.readdirSync(distDir, { withFileTypes: true });

  entries.forEach((entry) => {
    if (entry.isDirectory() && entry.name !== 'shared') {
      const componentDir = path.join(distDir, entry.name);
      const files = fs.readdirSync(componentDir);

      let totalSize = 0;
      const fileDetails = [];

      files.forEach((file) => {
        const filePath = path.join(componentDir, file);
        const stats = fs.statSync(filePath);
        totalSize += stats.size;
        fileDetails.push({
          name: file,
          size: stats.size,
          sizeKB: (stats.size / 1024).toFixed(2),
        });
      });

      components.push({
        name: entry.name,
        totalSize,
        totalSizeKB: (totalSize / 1024).toFixed(2),
        files: fileDetails,
      });
    }
  });

  // Sort by size (largest first)
  components.sort((a, b) => b.totalSize - a.totalSize);

  console.log('📦 Components by size:');
  components.forEach((component, index) => {
    console.log(`${index + 1}. ${component.name}: ${component.totalSizeKB} KB`);
    component.files.forEach((file) => {
      console.log(`   - ${file.name}: ${file.sizeKB} KB`);
    });
    console.log('');
  });

  const totalLibrarySize = components.reduce((sum, comp) => sum + comp.totalSize, 0);
  console.log(`📊 Total library size: ${(totalLibrarySize / 1024).toFixed(2)} KB`);

  // Generate size report
  const report = {
    timestamp: new Date().toISOString(),
    totalSize: totalLibrarySize,
    totalSizeKB: (totalLibrarySize / 1024).toFixed(2),
    components: components.map((comp) => ({
      name: comp.name,
      sizeKB: comp.totalSizeKB,
      files: comp.files.length,
    })),
  };

  fs.writeFileSync(path.resolve(distDir, 'size-report.json'), JSON.stringify(report, null, 2));
  console.log('📄 Size report saved to dist/size-report.json');
}

analyzeComponents();
