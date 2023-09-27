'use client';

// eslint-disable-next-line import/no-extraneous-dependencies
import { AiOutlineCloseCircle } from 'react-icons/ai';

function CloseButton() {
  return (
    <button type="button" className="text-2xl bg-slate-300 rounded-full">
      <AiOutlineCloseCircle />
    </button>
  );
}

export default CloseButton;
