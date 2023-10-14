'use client';

import { MdReportGmailerrorred } from 'react-icons/md';

function ModerationButton() {
  return (
    <button type="button">
      <span>
        <MdReportGmailerrorred className="inline text-3xl" />
        Modérer
      </span>
    </button>
  );
}

export default ModerationButton;
