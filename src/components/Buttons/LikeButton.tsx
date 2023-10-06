"use client";

import axiosInstance from '@/src/utils/axios';
import { BsHeartFill, BsHeart } from 'react-icons/bs';

interface LikeButtonProps {
    userId: string;
    artworkId: string;
    isLiked: boolean;
    setIsLiked: (isLiked: boolean) => void;
}

function LikeButton({ userId, artworkId, isLiked, setIsLiked}: LikeButtonProps) {
    const payload = {
        artworkId: artworkId
    }

    function on() {
      axiosInstance.post(`/users/${userId}/likes`, payload, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((res) => {
        console.log("res.data likes", res.data);
    }).catch((err) => {
        console.log(err);
        throw err;
    })

    setIsLiked(true); 
    }

    function off() {
      axiosInstance.delete(`/users/${userId}/likes`, {
        data: payload,
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        console.log("res.data likes", res.data);
    }).catch((err) => {
        console.log(err);
        throw err;
    })
    setIsLiked(false);
    }

  return <button onClick={isLiked ? off : on}>
    {isLiked ? <span><BsHeartFill className={`${isLiked && "animate-ping"} inline text-3xl`}/> Liké</span> : 
                <span><BsHeart className="inline text-2xl"/> Liker</span>}
    </button>;
}

export default LikeButton;
