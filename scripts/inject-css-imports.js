import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function injectCssImports() {
  const distDir = path.resolve(__dirname, '../dist');

  if (!fs.existsSync(distDir)) {
    console.error('❌ dist directory not found');
    return;
  }

  // Get all component directories
  const componentDirs = fs.readdirSync(distDir).filter((item) => {
    const itemPath = path.join(distDir, item);
    return (
      fs.statSync(itemPath).isDirectory() &&
      fs.existsSync(path.join(itemPath, 'index.js')) &&
      fs.existsSync(path.join(itemPath, 'index.css'))
    );
  });

  console.log(`📦 Found ${componentDirs.length} components with CSS files:`, componentDirs);

  componentDirs.forEach((componentName) => {
    const jsFilePath = path.join(distDir, componentName, 'index.js');
    const cssFilePath = path.join(distDir, componentName, 'index.css');

    if (fs.existsSync(jsFilePath) && fs.existsSync(cssFilePath)) {
      let jsContent = fs.readFileSync(jsFilePath, 'utf-8');

      // Check if CSS import already exists
      if (
        !jsContent.includes("import './index.css'") &&
        !jsContent.includes('import "./index.css"')
      ) {
        // Add CSS import at the top
        jsContent = `import './index.css';\n${jsContent}`;

        // Write back to file
        fs.writeFileSync(jsFilePath, jsContent);
        console.log(`✅ Added CSS import to ${componentName}/index.js`);
      } else {
        console.log(`ℹ️ CSS import already exists in ${componentName}/index.js`);
      }
    }
  });

  console.log('🎉 CSS injection completed!');
}

injectCssImports();
