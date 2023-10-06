"use client";

import { useState } from 'react';
import axiosInstance from '@/src/utils/axios';
import { RiHeartAddFill, RiHeartAddLine } from 'react-icons/ri';

interface FaveButtonProps {
    userId: string;
    artworkId: string;
    isFaves: boolean;
    setIsFaves: (isFaves: boolean) => void;
}

function FaveButton({ userId, artworkId, isFaves, setIsFaves}: FaveButtonProps) {
    const payload = {
        artworkId: artworkId
    }

    function on() {
      axiosInstance.post(`/users/${userId}/favorites`, payload, {
          headers: {
              'Content-Type': 'application/json'
          }
      })
      .then((res) => {
          console.log("res.data faves", res.data);
      }).catch((err) => {
          console.log(err);
          throw err;
      })
  
      setIsFaves(true); 
  }

    function off() {
      axiosInstance.delete(`/users/${userId}/favorites`, {
          data: payload,
          headers: {
              'Content-Type': 'application/json'
          }
      })
      .then((res) => {
          console.log("res.data faves", res.data);
      }).catch((err) => {
          console.log(err);
          throw err;
      })
  
      setIsFaves(false); 
  }

  return <button onClick={isFaves ? off : on}>
    {isFaves ? <span><RiHeartAddFill className={`${isFaves && "animate-ping"} inline text-4xl`}/> Dans mes favoris</span> : 
                <span><RiHeartAddLine className="inline text-3xl"/> Ajouter aux favoris</span>}
    </button>;
}

export default FaveButton;
