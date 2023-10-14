'use client';

import { IoIosArrowDropup, IoIosArrowDropdown } from 'react-icons/io';

interface ScrollProps {
    direction: string;
    onClick: () => void;
    className?: string;
}

export default function ScrollButton({ direction, onClick, className }: ScrollProps) {
  if (direction === 'up') {
    return (
      <div className={`${className} flex flex-col justify-center items-center`}>
        <button type="button" onClick={onClick} className="text-6xl flex justify-center">
          <IoIosArrowDropup />
        </button>
        <p className="hidden sm:block">Collection précedente</p>
      </div>
    );
  } if (direction === 'down') {
    return (
      <div className={`${className} flex flex-col justify-center items-center`}>
        <button type="button" onClick={onClick} className="text-6xl flex justify-center">
          <IoIosArrowDropdown />
        </button>
        <p className="hidden sm:block">Collection suivante</p>
      </div>
    );
  }
}

ScrollButton.defaultProps = {
  className: '',
};
