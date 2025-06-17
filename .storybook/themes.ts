import { create } from '@storybook/theming/create';

export const light = create({
  base: 'light',
  brandTitle: 'Talon UI',
  brandUrl: 'https://talonui.com',
  brandImage: '/talon-ui.webp',
});

export const dark = create({
  base: 'dark',
  brandTitle: 'Talon UI (Dark)',
  brandUrl: 'https://talonui.com',
  brandImage: '/talon-ui.webp',
});
