import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function openAnalysis() {
  const analysisPath = path.resolve(__dirname, '../bundle-analysis.html');

  if (!fs.existsSync(analysisPath)) {
    console.error('❌ Bundle analysis file not found at:', analysisPath);
    console.log("💡 Run 'npm run build:analyze' to generate the analysis file");
    return;
  }

  try {
    // Try to import and use the 'open' package
    const { default: open } = await import('open');
    await open(analysisPath);
    console.log('📊 Bundle analysis opened in your default browser');
  } catch (error) {
    console.log('📊 Bundle analysis generated at:', analysisPath);
    console.log('💡 Open this file in your browser to view the analysis');
    console.log('🔗 File path:', `file://${analysisPath}`);
  }
}

openAnalysis();
