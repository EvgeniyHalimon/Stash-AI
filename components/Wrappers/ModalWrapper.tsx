'use client';

import { ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface IModalWrapper {
  onClose: () => void;
  children: ReactNode;
  title: string;
}
export const ModalWrapper = ({ onClose, children, title }: IModalWrapper) => {
  if (typeof window === 'undefined') {
    return null;
  }

  const modalContent = (
    <div className="modal-backdrop">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button onClick={onClose} className="modal-close-button">
            ✕
          </button>
        </div>

        {children}
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};
