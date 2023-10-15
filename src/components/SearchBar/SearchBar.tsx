/* eslint-disable no-unused-vars */
import { useState, ChangeEvent } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

interface SearchBarProps {
    onSearchChange: (query: string) => void;
}

export default function SearchBar({ onSearchChange }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchQuery(value);
    onSearchChange(value);
  };

  return (
    <div className="flex items-center border-2 rounded-full border-gray-600 relative w-[90vw] sm:w-[35%] h-10 md:h-12">
      <input
        type="text"
        className="text-center py-1 sm:py-2 px-3 sm:px-4 text-sm sm:text-lg w-full outline-none rounded-full bg-transparent pl-3 sm:pl-4 pr-10"
        placeholder="Rechercher"
        value={searchQuery}
        onChange={handleInputChange}
      />
      <AiOutlineSearch className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 w-5 h-5" />
    </div>
  );
}
