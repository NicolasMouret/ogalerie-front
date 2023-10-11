'use client';

import axiosInstance from '@/src/utils/axios';
import { useContext, useState, useEffect } from 'react';
import CloseButton from '@/src/components/Buttons/CloseButton';
import { Tags } from '@/src/@types';

interface FilterProps {
  handleClose: () => void
}

export default function Filter({handleClose}: FilterProps) {
  const [TagId, setTagId] = useState('');
  const [tag, setTag] = useState<Tags>();


  useEffect(() => {
    setTagId(localStorage.getItem('id')!);
}, []);

  useEffect(() => {
    const getTag = (id: string) => {
      axiosInstance.get(`/tags/${id}`)
      .then(res => {
        console.log("res.data", res.data);
        setTag(res.data);
      }).catch(err => {
        console.log(err);
        throw err;
      })
    }
    getTag(TagId);
  }
  , []);
  

  return (
    <div>
      
        <div className="fixed flex flex-col justify-start h-[70vh] w-[60vw] top-[17vh] right-0 z-50 transform translate-x-0 transition-transform ease-linear duration-700 p-4 shadow-gray-400 shadow-xl rounded-lg bg-gray-200">
          <CloseButton
            className="absolute top-4 right-4 text-gray-700 hover:bg-gray-200 active:bg-gray-400 p-1 rounded-full w-10 h-10 flex items-center justify-center"
            onClick={handleClose}
          />
          <h2 className='text'>Liste des tags</h2>
        </div>
      
    </div>
  );
}
