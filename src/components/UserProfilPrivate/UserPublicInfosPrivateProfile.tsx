'use client';

import React, { useState } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import ModifyButton from '../Buttons/ModifyButton';
import SaveButton from '../Buttons/SaveButton';

interface UserPublicInfosProps {
    nickname: string;
    town: string;
    country: string;
    biography?: string;
    avatar: string;
    likedCount: number;
}

export default function UserPublicInfosPrivateProfile({ 
    nickname ,
    town ,
    country ,
    biography,
    avatar ,
    likedCount}: UserPublicInfosProps)  {
    
    const [nicknameState, setNicknameState] = useState(nickname);
    const [townState, setTownState] = useState(town);
    const [countryState, setCountryState] = useState(country);
    const [biographyState, setBiographyState] = useState(biography);
    const [isEditing, setIsEditingState] = useState(false);


    return (
        <div className='flex flex-col md:flex-row mx-auto max-w-3xl border-2 rounded-xl p-5 relative'>
            <div className="absolute top-2 right-2">
                <ModifyButton onClick={() => setIsEditingState(!isEditing)} />
            </div>
            <div className='m-1 w-32 h-32 rounded-full overflow-hidden relative mb-4 md:mb-0'>
                <img src={avatar} alt="Profile" className="absolute" />
            </div>
            <div className='w-full md:w-5/6 mx-auto flex flex-col justify-center ml-4'>
                {isEditing ? (
                    <>
                        <input 
                            type="text" 
                            value={nicknameState} 
                            onChange={(e) => setNicknameState(e.target.value)} 
                            className='text-3xl font-bold mb-3 p-2 border rounded' 
                        />
                        <div className='text-2xl'>
                            <input 
                                type="text" 
                                value={townState} 
                                onChange={(e) => setTownState(e.target.value)} 
                                className='p-2 border rounded'
                            />, 
                            <input 
                                type="text" 
                                value={countryState} 
                                onChange={(e) => setCountryState(e.target.value)} 
                                className='p-2 border rounded'
                            />
                        </div>
                        <textarea 
                            value={biographyState} 
                            onChange={(e) => setBiographyState(e.target.value)} 
                            className='mt-2 text-justify p-2 border rounded h-32'
                        />
                        <SaveButton onClick={() => setIsEditingState(false)} />
                    </>
                ) : (
                    <>
                        <h2 className='text-3xl font-bold mb-3'>{nickname}</h2>
                        <div className='text-2xl'>
                            <span>{town}, </span>
                            <span>{country}</span>
                        </div>
                        <div className='mt-2 mr-2 text-justify'>
                            <p>{biography}</p>
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

