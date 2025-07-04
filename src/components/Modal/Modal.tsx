'use client';

import styles from './Modal.module.scss';

import { FC, ReactNode, useEffect } from 'react';

import ReactDOM from 'react-dom';

import { TestMetaData } from '@/interfaceCollection/TestMetaData.interface';
import { appendTestMetaData } from '@/tools/testMetaData';

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  testMetaData?: TestMetaData;
};

export const Modal: FC<ModalProps> & {
  Overlay: FC<ModalOverlayProps>;
  Content: FC<ModalContentProps>;
  Header: FC<ModalSectionProps>;
  Body: FC<ModalSectionProps>;
  Footer: FC<ModalSectionProps>;
} = ({ isOpen, onClose, children, testMetaData }) => {
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={styles.wrapper} {...testMetaData}>
      {children}
    </div>,
    document.body,
  );
};

export type ModalOverlayProps = {
  onClick?: () => void;
  testMetaData?: TestMetaData;
};

const Overlay: FC<ModalOverlayProps> = ({ onClick, testMetaData }) => {
  const meta = appendTestMetaData(testMetaData, 'Overlay');
  return <div className={styles.overlay} onClick={onClick} {...meta} />;
};

export type ModalContentProps = {
  children: ReactNode;
  testMetaData?: TestMetaData;
};

const Content: FC<ModalContentProps> = ({ children, testMetaData }) => {
  const meta = appendTestMetaData(testMetaData, 'Content');
  return (
    <div
      className={styles.modal}
      onClick={(e) => e.stopPropagation()}
      role="dialog"
      aria-modal="true"
      {...meta}
    >
      {children}
    </div>
  );
};

export type ModalSectionProps = {
  children: ReactNode;
  testMetaData?: TestMetaData;
};

const Header: FC<ModalSectionProps> = ({ children, testMetaData }) => {
  const meta = appendTestMetaData(testMetaData, 'Header');
  return (
    <div className={styles.header} {...meta}>
      {children}
    </div>
  );
};

const Body: FC<ModalSectionProps> = ({ children, testMetaData }) => {
  const meta = appendTestMetaData(testMetaData, 'Body');
  return (
    <div className={styles.body} {...meta}>
      {children}
    </div>
  );
};

const Footer: FC<ModalSectionProps> = ({ children, testMetaData }) => {
  const meta = appendTestMetaData(testMetaData, 'Footer');
  return (
    <div className={styles.footer} {...meta}>
      {children}
    </div>
  );
};

Modal.Overlay = Overlay;
Modal.Content = Content;
Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

Modal.displayName = 'Modal';
