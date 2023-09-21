"use client";

import { useState } from 'react';

import { RiHeartAddFill, RiHeartAddLine } from 'react-icons/ri';

function FaveButton() {
    const [isFaves, setIsFaves] = useState(false)

    function onOff() {
        setIsFaves(!isFaves)
    }

  return <button onClick={onOff}>
    {isFaves ? <span><RiHeartAddFill className={`${isFaves && "animate-ping"} inline text-4xl`}/> Dans mes favoris</span> : 
                <span><RiHeartAddLine className="inline text-3xl"/> Ajouter aux favoris</span>}
    </button>;
}

export default FaveButton;
