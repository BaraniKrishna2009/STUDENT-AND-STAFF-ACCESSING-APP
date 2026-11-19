// src/components/Modal.tsx
import React, { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-lg w-full mx-4 p-6 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          {title && <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{title}</h3>}
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
