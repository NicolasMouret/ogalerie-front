"use client";

import { IoIosArrowDropup, IoIosArrowDropdown} from 'react-icons/io';

interface ScrollProps {
    direction: string;
    onClick: () => void;
    className?: string;
}


function ScrollButton({direction, onClick, className}: ScrollProps) {
    if (direction === "up") {
        return <div className={`${className} flex flex-col justify-center items-center`}>
            <button onClick={onClick} className="text-6xl flex justify-center">
                <IoIosArrowDropup />
            </button>
            <p>Collection précedente</p>
        </div>;
    } if (direction === "down") {
        return <div className={`${className} flex flex-col justify-center items-center`}>
            <button onClick={onClick}  className="text-6xl flex justify-center">
                <IoIosArrowDropdown />
            </button>
            <p>Collection suivante</p>
        </div>;
    }
}

export default ScrollButton;