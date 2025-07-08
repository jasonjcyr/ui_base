<p align="center">
  <img src="https://www.talonui.com/talon-ui.webp" width="120" alt="Talon UI Logo" />
</p>

<h1 align="center">@reactnextjsguru/talon-ui</h1>

# 🦅 Talon UI — React Component Library for Next.js 14+ & React 19

[![npm version](https://img.shields.io/npm/v/@reactnextjsguru/talon-ui.svg)](https://www.npmjs.com/package/@reactnextjsguru/talon-ui)
[![license](https://img.shields.io/npm/l/@reactnextjsguru/talon-ui)](https://github.com/jasonjcyr/ui_base/blob/main/LICENSE)
[![issues](https://img.shields.io/github/issues/jasonjcyr/ui_base)](https://github.com/jasonjcyr/ui_base/issues)

**@reactnextjsguru/talon-ui** is a fully SSR-ready collection of compound, accessible, and theming-ready React components—purpose-built for the **Next.js App Router** and **React 19**.

> ✅ Supports **Next.js 14+** and **React 19** (including Server Components)

---

## 📦 Install

```bash
npm install @reactnextjsguru/talon-ui
# or
yarn add @reactnextjsguru/talon-ui
```

🌐 [**Live Demo**](https://talonui.com)  \|  📘 [**Storybook Docs**](https://talonui.com)

---

## ✨ Features

- ✅ **Compound Component Pattern** – Intuitive and composable APIs
- ✅ **SSR-Ready** – Designed for server components & streaming
- ✅ **Next.js App Directory Compatible** – Works seamlessly with layouts and server/client boundaries
- ✅ **Typed with TypeScript** – Fully typed props, hooks, and utilities
- ✅ **Tree-Shakable** – Only include what you use
- ✅ **SCSS Theming** – Customize with SCSS variables or extend with CSS
- ✅ **Storybook, Jest & Playwright Ready** – Built-in support for documentation and testing
- ✅ **React 19 Optimized** – Uses new features like `use` and async server components

---

## 🚀 Getting Started

### 1\. Import a Component

```tsx
'use client';

import { Button } from '@reactnextjsguru/talon-ui/Button';

export default function Example() {
  return <Button variant="primary">Click me</Button>;
}
```

### 2\. Import Global Styles

To enable global SCSS tokens, CSS custom properties, and utility classes:

```tsx
import '@reactnextjsguru/talon-ui/styles/index.css';
```

> 💡 Supports global theming via SCSS variables or local component overrides.

---

## 🧱 Component Examples

### Button

```tsx
<Button variant="primary" size="md">
  Submit
</Button>
```

> Explore the full catalog in [Storybook →](https://talonui.com)

---

## 🎨 Customizing Theme

Talon UI uses SCSS variables for theming. You can override these in your app:

```scss
// styles/_overrides.scss
$primary-color: #007aff;
$font-family-base: 'Inter', sans-serif;

@use '@reactnextjsguru/talon-ui/styles' with (
  $primary-color: $primary-color,
  $font-family: $font-family-base
);
```

---

## 🧪 Testing & Tooling

Talon UI works seamlessly with modern tooling:

| Tool             | Supported |
| ---------------- | --------- |
| **Next.js**      | ✅        |
| **React 19**     | ✅        |
| **TypeScript**   | ✅        |
| **SCSS Modules** | ✅        |
| **Storybook**    | ✅        |
| **Jest**         | ✅        |
| **Playwright**   | ✅        |
| **Vite**         | ✅        |

To run tests locally:

```bash
npm run test
```

---

## 📁 Project Structure

```
talon-ui/
├── src/
│   ├── components/       # React components
│   ├── styles/           # SCSS variables, mixins, global theme
│   └── index.ts          # Entry exports
├── dist/                 # Compiled output
├── stories/              # Storybook stories
├── tests/                # Unit & integration tests
```

---

## 🔧 Configuration

### Using SCSS in Your App

Make sure your app supports SCSS:

#### `next.config.js`

```js
const path = require('path');

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
};
```

---

## 🤝 Contributing

We welcome contributions of all kinds:

```bash
git clone https://github.com/jasonjcyr/ui_base.git
cd talon-ui
npm install
npm run dev
```

Please see our [CONTRIBUTING.md](https://github.com/jasonjcyr/ui_base/blob/main/CONTRIBUTING.md) for guidelines.

---

## 📄 License

[MIT License](https://github.com/jasonjcyr/ui_base/blob/main/LICENSE) © [@reactnextjsguru](https://github.com/jasonjcyr)

---

## 🔗 Links

- 🔍 **Docs**: [Storybook](https://www.talonui.com/)
- 🌐 **Demo**: [Live Site](https://www.talonui.com/)
- 🧵 **Discussions**: [GitHub Discussions](https://github.com/jasonjcyr/ui_base/discussions)
- 🐞 **Issues**: [File an Issue](https://github.com/jasonjcyr/ui_base/issues)

---

**Talon UI** — Built with 🖤 for modern frontend teams.
