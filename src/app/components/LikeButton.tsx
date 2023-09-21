"use client";

import { useState } from 'react';

import { BsHeartFill, BsHeart } from 'react-icons/bs';

function LikeButton() {
    const [isLiked, setIsLiked] = useState(false)

    function onOff() {
        setIsLiked(!isLiked)
    }

  return <button onClick={onOff}>
    {isLiked ? <span><BsHeartFill className={`${isLiked && "animate-ping"} inline text-2xl`}/> Liké</span> : 
                <span><BsHeart className="inline text-2xl"/> Liker</span>}
    </button>;
}

export default LikeButton;
