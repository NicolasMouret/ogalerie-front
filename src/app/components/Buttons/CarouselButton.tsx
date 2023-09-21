"use client";

import { IoIosArrowDroprightCircle, IoIosArrowDropleftCircle } from 'react-icons/io';

interface CarouselProps {
    direction: string;
}


function CarouselButton({direction}: CarouselProps) {
    if (direction === "left") {
        return <button className="text-5xl">
                <IoIosArrowDropleftCircle />
            </button>
            
    } if (direction === "right") {
        return <button className="text-5xl">
                <IoIosArrowDroprightCircle />
                </button>
            
    }
}

export default CarouselButton;