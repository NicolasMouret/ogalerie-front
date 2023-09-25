"use client";

import { AiOutlineCloseCircle } from 'react-icons/ai';

interface CloseButtonProps {
  onClick: () => void;
  className?: string;
}

function CloseButton({ onClick, className }: CloseButtonProps) {
  return (
  <button className={`text-2xl ${className}`} onClick={onClick}>
    <AiOutlineCloseCircle />
    </button>
  );
}

export default CloseButton;