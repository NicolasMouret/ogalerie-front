/* eslint-disable react/require-default-props */

'use client';

import { AiOutlineCloseCircle } from 'react-icons/ai';

interface CloseButtonProps {
  onClick: () => void;
  className?: string;
}

export default function CloseButton({ onClick, className }: CloseButtonProps) {
  return (
    <button type="button" className={`text-2xl ${className}`} onClick={onClick}>
      <AiOutlineCloseCircle />
    </button>
  );
}
