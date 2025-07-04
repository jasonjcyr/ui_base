'use client';

import styles from './Accordion.module.scss';

import { FC, ReactNode, useState } from 'react';
import React from 'react';

import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';

import { Typography } from '@/components/Typography';
import { TestMetaData } from '@/interfaceCollection/TestMetaData.interface';
import { appendTestMetaData } from '@/tools/testMetaData';

export type AccordionProps = {
  children: ReactNode;
  testMetaData?: TestMetaData;
  className?: string;
};

export type AccordionItemProps = {
  children: ReactNode;
  defaultOpen?: boolean;
  testMetaData?: TestMetaData;
};

export type AccordionTriggerProps = {
  children: ReactNode;
  indicatorPosition?: 'left' | 'right';
  testMetaData?: TestMetaData;
};

export type AccordionContentProps = {
  children: ReactNode;
  testMetaData?: TestMetaData;
};

const AccordionItem: FC<AccordionItemProps> = ({ children, defaultOpen = false, testMetaData }) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={clsx(styles.item, { [styles.open]: open })} {...testMetaData}>
      {Array.isArray(children) &&
        children.map((child: any, index: number) => {
          if (child.type.displayName === 'Accordion.Trigger') {
            return React.cloneElement(child, {
              key: `trigger-${index}`,
              onToggle: () => setOpen(!open),
              open,
              testMetaData,
            });
          }
          if (child.type.displayName === 'Accordion.Content') {
            return (
              <div
                key={`content-${index}`}
                className={clsx(styles.content, {
                  [styles.expanded]: open,
                })}
              >
                {child}
              </div>
            );
          }
          return child;
        })}
    </div>
  );
};
AccordionItem.displayName = 'Accordion.Item';

const AccordionTrigger: FC<AccordionTriggerProps & { onToggle?: () => void; open?: boolean }> = ({
  children,
  onToggle,
  open,
  indicatorPosition = 'right',
  testMetaData,
}) => {
  const meta = appendTestMetaData(testMetaData, 'trigger');
  return (
    <button className={clsx(styles.trigger)} onClick={onToggle} aria-expanded={open} {...meta}>
      {indicatorPosition === 'left' && (
        <ChevronDown className={clsx(styles.chevron, { [styles.open]: open })} aria-hidden />
      )}
      <Typography variant="h6" className={styles.triggerText}>
        {children}
      </Typography>
      {indicatorPosition === 'right' && (
        <ChevronDown className={clsx(styles.chevron, { [styles.open]: open })} aria-hidden />
      )}
    </button>
  );
};
AccordionTrigger.displayName = 'Accordion.Trigger';

const AccordionContent: FC<AccordionContentProps> = ({ children, testMetaData }) => {
  return (
    <div className={styles.contentInner} {...testMetaData}>
      <Typography variant="body">{children}</Typography>
    </div>
  );
};
AccordionContent.displayName = 'Accordion.Content';

export const Accordion: FC<AccordionProps> & {
  Item: typeof AccordionItem;
  Trigger: typeof AccordionTrigger;
  Content: typeof AccordionContent;
} = ({ children, testMetaData, className }) => {
  return (
    <div className={clsx(styles.accordion, className)} {...testMetaData}>
      {children}
    </div>
  );
};

Accordion.Item = AccordionItem;
Accordion.Trigger = AccordionTrigger;
Accordion.Content = AccordionContent;
Accordion.displayName = 'Accordion';
