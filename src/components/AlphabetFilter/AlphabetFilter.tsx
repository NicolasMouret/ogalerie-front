/* eslint-disable no-unused-vars */

'use client';

interface AlphabetFilterProps {
  onLetterClick: (letter: string) => void;
}

export default function AlphabetFilter({ onLetterClick } : AlphabetFilterProps) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div className="flex flex-wrap justify-center space-x-5">
      {alphabet.map((letter) => (
        <button
          type="button"
          key={letter}
          className="text-base sm:text-xl transform transition-transform duration-200 focus:outline-none hover:scale-110 sm:hover:scale-125 leading-loose"
          style={{ transition: 'transform 200ms', transform: 'scale(1)' }}
          onFocus={(e) => { e.currentTarget.style.transform = 'scale(2)'; }}
          onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(2)'; }}
          onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
          onBlur={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
          onClick={() => onLetterClick && onLetterClick(letter)}
        >
          {letter}
        </button>
      ))}
    </div>
  );
}
