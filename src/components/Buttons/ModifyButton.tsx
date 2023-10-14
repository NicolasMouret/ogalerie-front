'use client';

import { MdModeEdit } from 'react-icons/md';

interface ModifyButtonProps {
    onClick?: () => void;
}

export default function ModifyButton({ onClick }: ModifyButtonProps) {
  return (
    <button type="button" onClick={onClick}>
      <MdModeEdit className="text-3xl" />
    </button>
  );
}

ModifyButton.defaultProps = {
  onClick: () => {},
};
