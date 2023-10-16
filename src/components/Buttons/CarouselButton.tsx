/* eslint-disable react/require-default-props */

'use client';

import { IoIosArrowDroprightCircle, IoIosArrowDropleftCircle } from 'react-icons/io';

interface CarouselProps {
    direction: string;
    className?: string;
    onClick?: () => void;
}

export default function CarouselButton({ direction, className, onClick }: CarouselProps) {
  if (direction === 'left') {
    return (
      <button type="button" onClick={onClick} className={`${className} lg:text-5xl`}>
        <IoIosArrowDropleftCircle />
      </button>
    );
  } if (direction === 'right') {
    return (
      <button type="button" onClick={onClick} className={`${className} lg:text-5xl`}>
        <IoIosArrowDroprightCircle />
      </button>
    );
  }
}
