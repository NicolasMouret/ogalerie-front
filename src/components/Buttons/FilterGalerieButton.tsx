/* eslint-disable react/require-default-props */

'use client';

import { Dispatch, SetStateAction } from 'react';
import { MdOutlineTune } from 'react-icons/md';
import { VscFoldUp } from 'react-icons/vsc';

interface FilterGalerieButtonProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>
  isOpen: boolean;
}

export default function FilterGalerieButton({ setIsOpen, isOpen }: FilterGalerieButtonProps) {
  const showFilter = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="text-xl md:text-2xl flex justify-center md:justify-start gap-2 md:gap-2 w-[90%] md:w-[30%] mb-2 md:mb-0">
      <button type="button" onClick={showFilter} className="flex items-center gap-1">
        <MdOutlineTune />
        {isOpen ? <VscFoldUp /> : 'Filtrer'}
      </button>
    </div>
  );
}
