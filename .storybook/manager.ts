// .storybook/manager.ts
import { addons } from '@storybook/addons';
import { create } from '@storybook/theming/create';

const theme = create({
  base: 'light', // or 'dark'
  brandTitle: 'Talon UI',
  brandUrl: 'https://talonui.com',
  brandImage: '/.storybook/public/talon-ui.webp',
});

addons.setConfig({
  theme,
});
