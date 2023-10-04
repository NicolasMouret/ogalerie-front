
import React from 'react';

interface DeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-black opacity-50 absolute inset-0" onClick={onClose}></div>
            <div className="bg-white p-8 rounded-lg shadow-xl relative w-full max-w-md">
                <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                    &times;
                </button>
                <div className="space-y-4">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;