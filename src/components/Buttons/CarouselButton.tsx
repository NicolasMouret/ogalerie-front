"use client";

import { IoIosArrowDroprightCircle, IoIosArrowDropleftCircle } from 'react-icons/io';

interface CarouselProps {
    direction: string;
}


function CarouselButton({direction}: CarouselProps) {
  if (direction === "left") {
    return <div className="text-5xl">
      <IoIosArrowDropleftCircle />
    </div>;
            
  } if (direction === "right") {
    return <div className="text-5xl">
      <IoIosArrowDroprightCircle />
    </div>;
            
  }
}

export default CarouselButton;