import fs from 'fs';
import path from 'path';

const distPath = path.resolve('./dist');
const pkgPath = path.resolve('./package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));

const components = fs
  .readdirSync(distPath, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .filter((dir) => fs.existsSync(path.join(distPath, dir.name, 'index.js')))
  .map((dir) => dir.name);

const newExports = {
  '.': {
    import: './dist/index.js',
    types: './dist/index.d.ts',
  },
};

for (const comp of components) {
  newExports[`./${comp}`] = {
    import: `./dist/${comp}/index.js`,
    types: `./dist/${comp}.d.ts`,
  };
}

pkg.exports = newExports;

// Write updated package.json
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
console.log('✅ package.json exports updated');
