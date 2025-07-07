'use client';

import { Tabs } from './Tabs';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Tabs', () => {
  const setup = () =>
    render(
      <Tabs testMetaData={{ 'data-testid': 'tabs', 'data-uitest': 'tabs-uitest' }}>
        <Tabs.TabList>
          <Tabs.Tab>Tab 1</Tabs.Tab>
          <Tabs.Tab>Tab 2</Tabs.Tab>
        </Tabs.TabList>
        <Tabs.TabPanels>
          <Tabs.TabPanel>
            <p>Content 1</p>
          </Tabs.TabPanel>
          <Tabs.TabPanel>
            <p>Content 2</p>
          </Tabs.TabPanel>
        </Tabs.TabPanels>
      </Tabs>,
    );

  it('renders all tabs and tab panels correctly', () => {
    setup();
    expect(screen.getByRole('tab', { name: /tab 1/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /tab 2/i })).toBeInTheDocument();
    expect(screen.getByRole('tabpanel')).toHaveTextContent(/content 1/i);
  });

  it('switches tabs on click', () => {
    setup();
    fireEvent.click(screen.getByRole('tab', { name: /tab 2/i }));
    expect(screen.getByRole('tabpanel')).toHaveTextContent(/content 2/i);
  });

  it('assigns correct aria attributes for accessibility', () => {
    setup();
    const tab = screen.getByRole('tab', { name: /tab 1/i });
    const panel = screen.getByRole('tabpanel');
    expect(tab).toHaveAttribute('aria-controls', panel.id);
    expect(panel).toHaveAttribute('aria-labelledby', tab.id);
  });

  it('applies test metadata to rendered elements', () => {
    setup();
    const tab1 = screen.getByTestId('tabs-Tab-0');
    const tab2 = screen.getByTestId('tabs-Tab-1');
    expect(tab1).toBeInTheDocument();
    expect(tab2).toBeInTheDocument();
  });

  it('keyboard navigation works (ArrowRight)', () => {
    setup();
    const tab1 = screen.getByRole('tab', { name: /tab 1/i });
    const tab2 = screen.getByRole('tab', { name: /tab 2/i });

    tab1.focus();
    fireEvent.keyDown(tab1, { key: 'ArrowRight' });
    fireEvent.click(tab2);
    expect(screen.getByRole('tabpanel')).toHaveTextContent(/content 2/i);
  });

  it('keyboard navigation works (ArrowLeft)', () => {
    setup();
    const tab2 = screen.getByRole('tab', { name: /tab 2/i });
    const tab1 = screen.getByRole('tab', { name: /tab 1/i });

    fireEvent.click(tab2);
    tab2.focus();
    fireEvent.keyDown(tab2, { key: 'ArrowLeft' });
    fireEvent.click(tab1);
    expect(screen.getByRole('tabpanel')).toHaveTextContent(/content 1/i);
  });

  it('hides unselected tab panels', () => {
    setup();
    const tab2 = screen.getByRole('tab', { name: /tab 2/i });
    fireEvent.click(tab2);
    expect(screen.getByText(/content 2/i)).toBeVisible();
  });
});
