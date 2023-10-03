import React from 'react';
import { AiFillHeart } from 'react-icons/ai';
// import Image from 'next/image';

const UserPublicInfos = ({ 
    nickname = "Marty",
    city = "Lyon",
    country = "France",
    biography = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea.",
    avatar = "/IMG_8378.jpg",
    likedCount = 0 }) => {

  return (
    <div className='flex flex-col md:flex-row mr-8'>
        <div className='m-1 w-32 h-32 rounded-full overflow-hidden relative mb-4 md:mb-0'>
            <img src={avatar} alt="Profile" layout="fill" objectFit="cover" className="absolute" />
        </div>
        <div className='w-full md:w-2/5 mx-auto flex flex-col justify-center ml-4'>
            <h2 className='text-3xl font-bold mb-3'>{nickname}</h2> 
        <div className='text-2xl'>
            <span>{city}, </span>
            <span>{country}</span>
        </div>
        <div className='mt-2 text-justify'>
            <p>{biography}</p>
        </div>
        <div className='flex items-center mt-3'>
            <AiFillHeart className='mr-2 text-red-500'/>
            <span>{likedCount} œuvres likées</span>
        </div>
        </div>
    </div>
  );
};

export default UserPublicInfos;