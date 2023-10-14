import React, { useState } from 'react';
import { MdDensityMedium } from 'react-icons/md';

function MenuButton(props) {
  const [rotation, setRotation] = useState(0);

  const rotateIcon = () => {
    setRotation(rotation + 90);
    if (props.onClick) {
      props.onClick();
    }
  };

  return (
    <div>
      <button
        className="text-3xl"
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: 'transform 0.5s',
        }}
        onClick={rotateIcon}
      >
        <MdDensityMedium />
      </button>
    </div>
  );
}

export default MenuButton;










