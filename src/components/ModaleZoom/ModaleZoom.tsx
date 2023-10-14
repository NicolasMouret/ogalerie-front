'use-client';

import React from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import CloseButton from '../Buttons/CloseButton';

interface ModaleZoomProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export default function ModaleZoom({ isOpen, onClose, children }: ModaleZoomProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 overflow-y-auto">
      <OutsideClickHandler onOutsideClick={onClose}>
        <div className="relative max-w-[90vw] max-h-[90vh]">
          <CloseButton onClick={onClose} className="sm:hidden text-white absolute top-[-40px] left-1/2 transform -translate-x-1/2 z-10" />
          <CloseButton onClick={onClose} className="hidden sm:block text-white absolute top-[-25px] right-[-25px] z-10" />
          <div className="bg-white p-4 rounded-md overflow-y-auto h-full w-full">
            {children}
          </div>
        </div>
      </OutsideClickHandler>
    </div>
  );
}
