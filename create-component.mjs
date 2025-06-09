import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const toPascalCase = (str) =>
  str
    .replace(/[-_]+/g, ' ')
    .replace(/\s+(\w)/g, (_, c) => c.toUpperCase())
    .replace(/^\w/, (c) => c.toUpperCase());

rl.question('🔧 Enter the component name: ', (inputName) => {
  if (!inputName) {
    console.error('❌ Component name cannot be empty.');
    rl.close();
    return;
  }

  const componentName = toPascalCase(inputName);
  const targetDir = path.join(process.cwd(), 'src', 'components', componentName);

  if (fs.existsSync(targetDir)) {
    console.error(`❌ Component "${componentName}" already exists.`);
    rl.close();
    return;
  }

  fs.mkdirSync(targetDir, { recursive: true });

  const tsx = `import styles from './${componentName}.module.scss';

interface ${componentName}Props {
  // Define props here
}

export const ${componentName} = (props: ${componentName}Props) => {
  return <div className={styles.${componentName.toLowerCase()}}>Hello, ${componentName}</div>;
};
`;

  const scss = `@use '../../styles' as *;

  .${componentName.toLowerCase()} {
  /* Component styles */
}
`;

  const index = `export { ${componentName} } from './${componentName}';\n`;

  const storybook = `import { ${componentName} } from './${componentName}';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ${componentName}> = {
  title: 'Components/${componentName}',
  component: ${componentName},
  tags: ['autodocs'],
  argTypes: {},
  }

export default meta;
type Story = StoryObj<typeof ${componentName}>;


export const Default: Story = {};
`;
  fs.writeFileSync(path.join(targetDir, `${componentName}.tsx`), tsx);
  fs.writeFileSync(path.join(targetDir, `${componentName}.module.scss`), scss);
  fs.writeFileSync(path.join(targetDir, `index.ts`), index);
  fs.writeFileSync(path.join(targetDir, `${componentName}.stories.ts`), storybook);

  console.log(`✅ Component "${componentName}" created at src/components/${componentName}`);

  const srcIndexPath = path.join(process.cwd(), 'src/components', 'index.ts');
  const exportLineRoot = `export * from './${componentName}';\n`;

  if (!fs.existsSync(srcIndexPath)) {
    fs.writeFileSync(srcIndexPath, exportLineRoot);
  } else {
    const currentRoot = fs.readFileSync(srcIndexPath, 'utf8');
    if (!currentRoot.includes(exportLineRoot)) {
      fs.appendFileSync(srcIndexPath, exportLineRoot);
    }
  }
  console.log(`✅ Exported "${componentName}" in src/components/index.ts`);
  rl.close();
});
