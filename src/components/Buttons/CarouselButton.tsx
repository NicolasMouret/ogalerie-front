"use client";

import { IoIosArrowDroprightCircle, IoIosArrowDropleftCircle } from 'react-icons/io';

interface CarouselProps {
    direction: string;
    className?: string;
    onClick?: () => void;
}


function CarouselButton({direction, className, onClick}: CarouselProps) {
  if (direction === "left") {
    return <button onClick={onClick} className={`${className}`}>
      <IoIosArrowDropleftCircle />
    </button>;
            
  } if (direction === "right") {
    return <button onClick={onClick} className={`${className}`}>
      <IoIosArrowDroprightCircle />
    </button>;
            
  }
}

export default CarouselButton;