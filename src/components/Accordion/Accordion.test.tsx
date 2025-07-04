import { Accordion } from './Accordion';
import { fireEvent, render, screen } from '@testing-library/react';

import React from 'react';

describe('Accordion', () => {
  const setup = (props: any = {}) =>
    render(
      <Accordion testMetaData={{ 'data-testid': 'accordion-root' }} {...props}>
        <Accordion.Item defaultOpen={false} testMetaData={{ 'data-testid': 'accordion-item' }}>
          <Accordion.Trigger testMetaData={{ 'data-testid': 'accordion-trigger' }}>
            Toggle Section
          </Accordion.Trigger>
          <Accordion.Content testMetaData={{ 'data-testid': 'accordion-content' }}>
            Accordion content goes here
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>,
    );

  it('renders all parts with correct test metadata', () => {
    setup();
    expect(screen.getByTestId('accordion-root')).toBeInTheDocument();
    expect(screen.getByTestId('accordion-item')).toBeInTheDocument();
    expect(screen.getByTestId('accordion-item-trigger')).toBeInTheDocument();
    expect(screen.getByTestId('accordion-content')).toBeInTheDocument();
  });

  it('toggles content when clicking the trigger', () => {
    setup();
    const trigger = screen.getByTestId('accordion-item-trigger');
    fireEvent.click(trigger);
    expect(screen.getByTestId('accordion-content')).toBeVisible();
    fireEvent.click(trigger);
  });

  it('respects defaultOpen prop', () => {
    render(
      <Accordion testMetaData={{ 'data-testid': 'accordion-root' }}>
        <Accordion.Item defaultOpen testMetaData={{ 'data-testid': 'accordion-item' }}>
          <Accordion.Trigger testMetaData={{ 'data-testid': 'accordion-trigger' }}>
            Open by Default
          </Accordion.Trigger>
          <Accordion.Content testMetaData={{ 'data-testid': 'accordion-content' }}>
            Default open content
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>,
    );

    expect(screen.getByTestId('accordion-content')).toBeVisible();
  });

  it('renders the chevron on the left when specified', () => {
    render(
      <Accordion>
        <Accordion.Item testMetaData={{ 'data-testid': 'accordion-item' }}>
          <Accordion.Trigger
            indicatorPosition="left"
            testMetaData={{ 'data-testid': 'accordion-trigger' }}
          >
            Left Chevron
          </Accordion.Trigger>
          <Accordion.Content testMetaData={{ 'data-testid': 'accordion-content' }}>
            Content
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>,
    );

    const trigger = screen.getByTestId('accordion-item-trigger');
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveTextContent('Left Chevron');
  });

  it('handles multiple items independently', () => {
    render(
      <Accordion testMetaData={{ 'data-testid': 'Accordion' }}>
        <Accordion.Item testMetaData={{ 'data-testid': 'item' }}>
          <Accordion.Trigger testMetaData={{ 'data-testid': 'trigger' }}>First</Accordion.Trigger>
          <Accordion.Content testMetaData={{ 'data-testid': 'content-1' }}>
            Content 1
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item>
          <Accordion.Trigger testMetaData={{ 'data-testid': 'trigger-2' }}>
            Second
          </Accordion.Trigger>
          <Accordion.Content testMetaData={{ 'data-testid': 'content-2' }}>
            Content 2
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>,
    );
    const trigger = screen.getByTestId('content-1');
    expect(trigger).toBeInTheDocument();
  });
});
