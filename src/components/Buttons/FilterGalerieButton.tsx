"use client";

import { MdOutlineTune } from 'react-icons/md';

interface FilterGalerieButtonProps {
  onClick: () => void|undefined;
}

function FilterGalerieButton({ onClick }: FilterGalerieButtonProps) {
  return (
  <button className="text-4xl" onClick={onClick}>
    <MdOutlineTune />
    </button>
  );
}

export default FilterGalerieButton;
