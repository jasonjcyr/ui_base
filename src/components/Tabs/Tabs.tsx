'use client';

import styles from './Tabs.module.scss';

import {
  Children,
  KeyboardEvent,
  ReactElement,
  ReactNode,
  cloneElement,
  isValidElement,
  useId,
  useState,
} from 'react';

import { Button } from '@/components/Button';
import { Label } from '@/components/Label';
import { TestMetaData } from '@/interfaceCollection/TestMetaData.interface';

type TabsProps = {
  children: ReactNode;
  defaultIndex?: number;
  testMetaData?: TestMetaData;
};

type TabProps = {
  children: ReactNode;
  selected?: boolean;
  onSelect?: () => void;
  id?: string;
  controls?: string;
  index?: number;
  testMetaData?: TestMetaData;
};

type TabPanelProps = {
  children: ReactNode;
  selected?: boolean;
  id?: string;
  labelledBy?: string;
  testMetaData?: TestMetaData;
};

// ---------- Component Type Guards ----------
function isTab(element: ReactNode): element is ReactElement<TabProps> {
  return isValidElement(element) && (element.type as any).displayName === 'Tab';
}

function isTabPanel(element: ReactNode): element is ReactElement<TabPanelProps> {
  return isValidElement(element) && (element.type as any).displayName === 'TabPanel';
}

function isTabList(element: ReactNode): element is ReactElement<{ children: ReactNode }> {
  return isValidElement(element) && (element.type as any).displayName === 'TabList';
}

function isTabPanels(element: ReactNode): element is ReactElement<{ children: ReactNode }> {
  return isValidElement(element) && (element.type as any).displayName === 'TabPanels';
}

export function Tabs({ children, defaultIndex = 0, testMetaData }: TabsProps) {
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex);
  const idPrefix = useId();

  const tabList: ReactElement[] = [];
  const tabPanels: ReactElement[] = [];

  Children.toArray(children).forEach((child) => {
    if (isTabList(child)) {
      Children.forEach(child.props.children, (tab, index) => {
        if (isTab(tab)) {
          tabList.push(
            cloneElement(tab, {
              selected: selectedIndex === index,
              onSelect: () => setSelectedIndex(index),
              id: `${idPrefix}-tab-${index}`,
              controls: `${idPrefix}-panel-${index}`,
              index,
              testMetaData,
            }),
          );
        }
      });
    } else if (isTabPanels(child)) {
      Children.forEach(child.props.children, (panel, index) => {
        if (isTabPanel(panel)) {
          tabPanels.push(
            cloneElement(panel, {
              selected: selectedIndex === index,
              id: `${idPrefix}-panel-${index}`,
              labelledBy: `${idPrefix}-tab-${index}`,
              testMetaData,
            }),
          );
        }
      });
    }
  });

  return (
    <div className={styles.tabs} {...testMetaData}>
      <div className={styles.tabList}>{tabList}</div>
      <div className={styles.tabPanels}>{tabPanels}</div>
    </div>
  );
}

export function TabList({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
TabList.displayName = 'TabList';

export function Tab({ children, selected, onSelect, id, controls, index, testMetaData }: TabProps) {
  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const keyActions: Record<string, () => void> = {
      ArrowRight: () => onSelect?.(),
      ArrowLeft: () => onSelect?.(),
    };
    keyActions[e.key]?.();
  };

  return (
    <Button
      role="tab"
      variant={selected ? 'primary' : 'ghost'}
      aria-selected={selected}
      aria-controls={controls}
      id={id}
      tabIndex={selected ? 0 : -1}
      onClick={onSelect}
      onKeyDown={handleKeyDown}
      testMetaData={{
        'data-testid': `${testMetaData?.['data-testid']}-Tab-${index}`,
        'data-uitest': `${testMetaData?.['data-uitest']}-Tab-${index}`,
      }}
    >
      <Label>{children}</Label>
    </Button>
  );
}
Tab.displayName = 'Tab';

export function TabPanels({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
TabPanels.displayName = 'TabPanels';

export function TabPanel({ children, selected, id, labelledBy, testMetaData }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={!selected}
      id={id}
      aria-labelledby={labelledBy}
      className={styles.tabPanel}
      {...testMetaData}
    >
      {selected && children}
    </div>
  );
}
TabPanel.displayName = 'TabPanel';

Tabs.TabList = TabList;
Tabs.Tab = Tab;
Tabs.TabPanels = TabPanels;
Tabs.TabPanel = TabPanel;
