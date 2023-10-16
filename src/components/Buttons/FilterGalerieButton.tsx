'use client';

import { MdOutlineTune } from 'react-icons/md';

interface FilterGalerieButtonProps {
  onClick?: () => void;
}

export default function FilterGalerieButton({ onClick }: FilterGalerieButtonProps) {
  return (
    <button type="button" onClick={onClick} className="text-xl md:text-2xl flex justify-center md:justify-end items-center gap-2 md:gap-2 w-[90%] md:w-[30%] mb-4 md:mb-0">
      <MdOutlineTune />
      <span>Filtrer la galerie</span>
    </button>
  );
}

FilterGalerieButton.defaultProps = {
  onClick: () => {},
};
