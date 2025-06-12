'use client';

import { ReactNode } from 'react';

interface IModalWrapper {
  onClose: () => void;
  children: ReactNode;
  title: string;
}

export const ModalWrapper = ({ onClose, children, title }: IModalWrapper) => {
  return (
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
};
