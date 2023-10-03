'use client';

import React, { useState } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import ModifyButton from '../Buttons/ModifyButton';
import SaveButton from '../Buttons/saveButton';

const UserPublicInfosPrivateProfile = ({ 
    nickname = "Marty",
    town = "Lyon",
    country = "France",
    biography = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea.",
    avatar = "/IMG_8378.jpg",
    likedCount = 0 }) => {
    
    const [nicknameState, setNickname] = useState(nickname);
    const [townState, setTown] = useState(town);
    const [countryState, setCountry] = useState(country);
    const [biographyState, setBiography] = useState(biography);
    const [isEditing, setIsEditing] = useState(false);


    return (
        <div className='flex flex-col md:flex-row mx-auto max-w-3xl border-2 rounded-xl p-5 relative'>
            <div className="absolute top-2 right-2">
                <ModifyButton onClick={() => setIsEditing(!isEditing)} />
            </div>
            <div className='m-1 w-32 h-32 rounded-full overflow-hidden relative mb-4 md:mb-0'>
                <img src={avatar} alt="Profile" layout="fill" objectFit="cover" className="absolute" />
            </div>
            <div className='w-full md:w-5/6 mx-auto flex flex-col justify-center ml-4'>
                {isEditing ? (
                    <>
                        <input 
                            type="text" 
                            value={nicknameState} 
                            onChange={(e) => setNickname(e.target.value)} 
                            className='text-3xl font-bold mb-3 p-2 border rounded' 
                        />
                        <div className='text-2xl'>
                            <input 
                                type="text" 
                                value={townState} 
                                onChange={(e) => setTown(e.target.value)} 
                                className='p-2 border rounded'
                            />, 
                            <input 
                                type="text" 
                                value={countryState} 
                                onChange={(e) => setCountry(e.target.value)} 
                                className='p-2 border rounded'
                            />
                        </div>
                        <textarea 
                            value={biographyState} 
                            onChange={(e) => setBiography(e.target.value)} 
                            className='mt-2 text-justify p-2 border rounded h-32'
                        />
                        <SaveButton onClick={() => setIsEditing(false)} />
                    </>
                ) : (
                    <>
                        <h2 className='text-3xl font-bold mb-3'>{nicknameState}</h2>
                        <div className='text-2xl'>
                            <span>{townState}, </span>
                            <span>{countryState}</span>
                        </div>
                        <div className='mt-2 mr-2 text-justify'>
                            <p>{biographyState}</p>
                        </div>
                    </>
                )}
                <div className='flex justify-between items-center mt-7'>
                    <div className='flex items-center'>
                        <AiFillHeart className='mr-2 text-red-500'/>
                        <span>{likedCount} œuvres likées</span>
                    </div>
                    <p className='text-gray-400'>Informations publiques</p>
                </div>
            </div>
        </div>
    );
};

export default UserPublicInfosPrivateProfile;