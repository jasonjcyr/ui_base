// .storybook/manager.ts
import { dark, light } from './themes';
import { addons } from '@storybook/addons';

const storedTheme = localStorage.getItem('sb-ui-theme') || 'light';

addons.setConfig({
  theme: storedTheme === 'dark' ? dark : light,
});
