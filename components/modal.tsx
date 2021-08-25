import React from 'react';
import { Dialog } from 'evergreen-ui';

type ModalType = {
  isShown: boolean;
  setIsShown: (value: boolean) => void;
  title: string;
  label?: string;
  onSave?: any;
  intent?: any;
  hasFooter?: boolean;
  width?: number;
  children: React.ReactNode;
};

const defaultProps = {
  label: null,
  onSave: null,
  hasFooter: true,
  width: 560,
  intent: 'none',
};

const Modal = ({
  isShown,
  setIsShown,
  title,
  label,
  intent = 'none',
  width = 560,
  hasFooter = true,
  onSave = null,
  children,
}: ModalType) => {
  return (
    <Dialog
      isShown={isShown}
      intent={intent}
      title={title}
      onCloseComplete={() => setIsShown(false)}
      confirmLabel={label}
      hasFooter={hasFooter}
      width={width}
      shouldCloseOnEscapePress
      onConfirm={onSave}>
      {children}
    </Dialog>
  );
};

Modal.defaultProps = defaultProps;
export default Modal;
