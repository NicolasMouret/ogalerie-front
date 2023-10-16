/* eslint-disable no-unused-vars */

'use client';

import { BsHeartFill, BsHeart } from 'react-icons/bs';
import axiosInstance from '@/src/utils/axios';

interface LikeButtonProps {
    userId: string;
    artworkId: string;
    isLiked: boolean;
    setIsLiked: (isLiked: boolean) => void;
    setLikesTotal: (likesTotal: number) => void;
}

export default function LikeButton({
  userId, artworkId, isLiked, setIsLiked, setLikesTotal,
}: LikeButtonProps) {
  const payload = {
    artworkId,
  };

  function on() {
    axiosInstance.post(`/users/${userId}/likes`, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        console.log('like ok', res.data);
        setLikesTotal(res.data);
      }).catch((err) => {
        console.log(err);
      });

    setIsLiked(true);
  }

  function off() {
    axiosInstance.delete(`/users/${userId}/likes`, {
      data: payload,
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      console.log('res.data likes', res.data);
      setLikesTotal(res.data);
    }).catch((err) => {
      console.log(err);
      throw err;
    });
    setIsLiked(false);
  }

  return (
    <button type="button" onClick={isLiked ? off : on}>
      {isLiked ? (
        <span>
          <BsHeartFill className={`${isLiked && 'animate-ping'} inline text-3xl`} />
          {' '}
          Liké
        </span>
      )
        : (
          <span>
            <BsHeart className="inline text-2xl" />
            {' '}
            Liker
          </span>
        )}
    </button>
  );
}
