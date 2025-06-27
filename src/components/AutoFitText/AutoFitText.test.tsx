import { AutoFitText } from './AutoFitText';
import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';

import React from 'react';

let resizeCallback: () => void = () => {};
const observeMock = jest.fn();
const disconnectMock = jest.fn();

beforeEach(() => {
  resizeCallback = () => {};
  observeMock.mockClear();
  disconnectMock.mockClear();

  // @ts-ignore
  global.ResizeObserver = class {
    observe = observeMock;
    disconnect = disconnectMock;
    constructor(cb: () => void) {
      resizeCallback = cb;
    }
  };
});

describe('AutoFitText', () => {
  it('renders text content', () => {
    render(<AutoFitText text="Sample text" />);
    expect(screen.getByText('Sample text')).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    render(<AutoFitText text="Styled" className="custom-class" />);
    const container = screen.getByText('Styled').parentElement;
    expect(container).toHaveClass('custom-class');
  });

  it('applies test metadata if provided', () => {
    render(<AutoFitText text="Testable" testMetaData={{ 'data-testid': 'AutoFit' }} />);
    expect(screen.getByTestId('AutoFit-Text')).toHaveTextContent('Testable');
  });

  it('scales down long text when textWidth > containerWidth', async () => {
    render(<AutoFitText text="LongText" testMetaData={{ 'data-testid': 'AutoFit' }} />);
    const textElement = screen.getByTestId('AutoFit-Text');
    const container = textElement.parentElement!;

    Object.defineProperty(textElement, 'scrollWidth', { configurable: true, value: 200 });
    Object.defineProperty(container, 'offsetWidth', { configurable: true, value: 100 });

    await act(async () => {
      resizeCallback();
    });

    expect(textElement).toHaveStyle('transform: scale(0.5)');
  });

  it('does not scale when textWidth === containerWidth', async () => {
    render(<AutoFitText text="ExactFit" testMetaData={{ 'data-testid': 'AutoFit' }} />);
    const textElement = screen.getByTestId('AutoFit-Text');
    const container = textElement.parentElement!;

    Object.defineProperty(textElement, 'scrollWidth', { configurable: true, value: 150 });
    Object.defineProperty(container, 'offsetWidth', { configurable: true, value: 150 });

    await act(async () => {
      resizeCallback();
    });

    expect(textElement).toHaveStyle('transform: scale(1)');
  });

  it('does not scale if text fits container (textWidth < containerWidth)', async () => {
    render(<AutoFitText text="FitText" testMetaData={{ 'data-testid': 'AutoFit' }} />);
    const textElement = screen.getByTestId('AutoFit-Text');
    const container = textElement.parentElement!;

    Object.defineProperty(textElement, 'scrollWidth', { configurable: true, value: 100 });
    Object.defineProperty(container, 'offsetWidth', { configurable: true, value: 200 });

    await act(async () => {
      resizeCallback();
    });

    expect(textElement).toHaveStyle('transform: scale(1)');
  });

  it('handles missing refs without crashing', () => {
    const { unmount } = render(<AutoFitText text="Safe unmount" />);
    unmount();
    expect(() => resizeCallback()).not.toThrow();
  });

  it('calls ResizeObserver.observe if containerRef exists', async () => {
    const { container } = render(
      <AutoFitText text="Observed" testMetaData={{ 'data-testid': 'AutoFit' }} />,
    );

    await act(async () => {
      await Promise.resolve();
    });

    await act(async () => {
      resizeCallback();
    });

    const textElement = screen.getByTestId('AutoFit-Text');
    const refContainer = textElement.parentElement!;
    expect(observeMock).toHaveBeenCalledWith(refContainer);
  });

  it('calls ResizeObserver.disconnect on unmount', () => {
    const { unmount } = render(<AutoFitText text="Unmount me" />);
    unmount();
    expect(disconnectMock).toHaveBeenCalled();
  });
});
