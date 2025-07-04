import { Modal } from './Modal';
import { fireEvent, render, screen } from '@testing-library/react';

import React from 'react';

describe('Modal', () => {
  const onCloseMock = jest.fn();

  const baseTestId = { 'data-testid': 'test-modal' };

  const modalContent = (
    <>
      <Modal.Overlay data-testid="overlay" onClick={onCloseMock} />
      <Modal.Content data-testid="content">
        <Modal.Header data-testid="header">Header</Modal.Header>
        <Modal.Body data-testid="body">Body</Modal.Body>
        <Modal.Footer data-testid="footer">Footer</Modal.Footer>
      </Modal.Content>
    </>
  );

  beforeEach(() => {
    onCloseMock.mockClear();
  });

  it('renders nothing when closed', () => {
    const { container } = render(
      <Modal isOpen={false} onClose={onCloseMock} testMetaData={baseTestId}>
        {modalContent}
      </Modal>,
    );

    expect(container).toBeEmptyDOMElement();
  });

  //   it('renders modal with all subcomponents when open', () => {
  //     render(
  //       <Modal isOpen={true} onClose={onCloseMock} testMetaData={baseTestId}>
  //         {modalContent}
  //       </Modal>,
  //     );

  //     expect(screen.getByTestId('test-modal')).toBeInTheDocument();
  //     expect(screen.getByTestId('header')).toHaveTextContent('Header');
  //     expect(screen.getByTestId('body')).toHaveTextContent('Body');
  //     expect(screen.getByTestId('footer')).toHaveTextContent('Footer');
  //   });

  //   it('calls onClose when overlay is clicked', () => {
  //     render(
  //       <Modal isOpen={true} onClose={onCloseMock} testMetaData={baseTestId}>
  //         {modalContent}
  //       </Modal>,
  //     );

  //     fireEvent.click(screen.getByTestId('overlay'));
  //     expect(onCloseMock).toHaveBeenCalledTimes(1);
  //   });

  //   it('calls onClose when Escape key is pressed', () => {
  //     render(
  //       <Modal isOpen={true} onClose={onCloseMock} testMetaData={baseTestId}>
  //         {modalContent}
  //       </Modal>,
  //     );

  //     fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
  //     expect(onCloseMock).toHaveBeenCalledTimes(1);
  //   });

  //   it('prevents modal content click from bubbling to overlay', () => {
  //     const stopPropagationMock = jest.fn();

  //     render(
  //       <Modal isOpen={true} onClose={onCloseMock} testMetaData={baseTestId}>
  //         <>
  //           <Modal.Overlay data-testid="overlay" onClick={onCloseMock} />
  //           <Modal.Content data-testid="content">
  //             <div
  //               data-testid="inner-click"
  //               onClick={(e) => {
  //                 e.stopPropagation();
  //                 stopPropagationMock();
  //               }}
  //             >
  //               Test
  //             </div>
  //           </Modal.Content>
  //         </>
  //       </Modal>,
  //     );

  //     fireEvent.click(screen.getByTestId('inner-click'));
  //     expect(onCloseMock).not.toHaveBeenCalled();
  //     expect(stopPropagationMock).toHaveBeenCalled();
  //   });
});
