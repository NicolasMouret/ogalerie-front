"use client";

import { MdOutlineTune } from 'react-icons/md';

interface FilterGalerieButtonProps {
  onClick?: () => void;
}

function FilterGalerieButton({onClick}: FilterGalerieButtonProps) {
  return (
  <button onClick={onClick} className="text-4xl flex justify-end items-center w-[30%]">
    <MdOutlineTune /><span>Filtrer la galerie</span>
    </button>
  );
}

export default FilterGalerieButton;
