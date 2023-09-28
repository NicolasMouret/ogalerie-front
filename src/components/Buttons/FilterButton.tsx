"use client";

import { BsSliders } from 'react-icons/bs';

export default function FilterButton() {
    return (
        <button className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-colors duration-200">
            <BsSliders className="text-gray-600 w-6 h-6" />
        </button>
    )
}