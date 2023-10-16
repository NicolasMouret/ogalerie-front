/* eslint-disable react/require-default-props */

'use client';

interface ModifyButtonProps{
    onClick?: () => void;
}

export default function SaveButton({ onClick }: ModifyButtonProps) {
  return (
    <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded w-2/3" onClick={onClick}>
      Sauvegarder les modifications
    </button>
  );
}
