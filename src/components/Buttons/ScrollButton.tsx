"use client";

import { IoIosArrowDropup, IoIosArrowDropdown} from 'react-icons/io';

interface ScrollProps {
    direction: string;
}


function ScrollButton({direction}: ScrollProps) {
    if (direction === "up") {
        return <div className="flex flex-col justify-center">
            <button className="text-6xl flex justify-center">
                <IoIosArrowDropup />
            </button>
            <p>Collection précedente</p>
        </div>;
    } if (direction === "down") {
        return <div className="flex flex-col justify-center">
            <button className="text-6xl flex justify-center">
                <IoIosArrowDropdown />
            </button>
            <p>Collection suivante</p>
        </div>;
    }
}

export default ScrollButton;