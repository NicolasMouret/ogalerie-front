'use client';

import React, { useState, useContext } from 'react';
import Image from 'next/image';
import { UserContext } from '@/src/contexts/UserContext';
import axiosInstance from '@/src/utils/axios';
import { AiFillHeart } from 'react-icons/ai';
import ModifyButton from '../Buttons/ModifyButton';
import SaveButton from '../Buttons/SaveButton';
import EditAvatarButton from '../Buttons/EditAvatarButton';

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
    const {user, setUser} = useContext(UserContext);
    
    const [nicknameState, setNicknameState] = useState('');
    const [townState, setTownState] = useState('');
    const [countryState, setCountryState] = useState('');
    const [biographyState, setBiographyState] = useState('');
    const [uploadUrl, setUploadUrl] = useState("");
    const [isEditing, setIsEditingState] = useState(false);

    const handleOnUpload = (result: any) => {
        console.log(result.info);
        setUploadUrl(result.info.secure_url);  
      }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsEditingState(false);

        const form = e.currentTarget;
        const formData = new FormData(form);

        if(!formData.get('biography')) formData.delete('biography');
        if(!formData.get('town')) formData.delete('town');
        if(!formData.get('country')) formData.delete('country');
        if(!formData.get('nickname')) formData.delete('nickname');

        const objData = Object.fromEntries(formData);     
        
        if (uploadUrl) {
            objData.avatar = uploadUrl;
          }

        axiosInstance.patch(`/users/${user.id}`, objData)
            .then((res) => {
                console.log(res.data);
                setUser({...user, ...res.data});
            }).catch((err) => {
                console.log(err);
                throw err;
            });
    }


    return (
        <div className='flex flex-col md:flex-row mx-auto max-w-3xl border-2 rounded-xl p-5 relative'>
            <div className="absolute top-2 right-2">
                <ModifyButton onClick={() => setIsEditingState(!isEditing)} />
            </div>
            <div className={`m-1 w-32 h-32 rounded-full overflow-hidden mb-4 md:mb-0 ${isEditing ? 'border-gray-300 border-2' : '' }`}>
                {isEditing ? <EditAvatarButton handleOnUpload={handleOnUpload} /> : 
                <Image src={avatar} width={200} height={200} alt="Profile" className="object-none h-full" />}
            </div>
            <div className='w-full md:w-5/6 mx-auto flex flex-col justify-center ml-4'>
                {isEditing ? (
                    
                    <form className="flex flex-col" onSubmit={handleSubmit}>
                        <input 
                            type="text" 
                            value={nicknameState} 
                            placeholder="Pseudo"
                            onChange={(e) => setNicknameState(e.target.value)} 
                            className='text-3xl w-2/3 font-bold mb-3 p-2 border rounded' 
                            name="nickname"
                        />
                        <div className='text-2xl'>
                            <input 
                                type="text" 
                                value={townState} 
                                placeholder="Ville"
                                onChange={(e) => setTownState(e.target.value)} 
                                className='p-2 border rounded w-2/3'
                                name="town"
                            />
                            <input 
                                type="text" 
                                value={countryState} 
                                placeholder="Pays"
                                onChange={(e) => setCountryState(e.target.value)} 
                                className='p-2 border rounded w-2/3'
                                name="country"
                            />
                        </div>
                        <textarea 
                            value={biographyState} 
                            placeholder="Biographie"
                            onChange={(e) => setBiographyState(e.target.value)} 
                            className='mt-2 text-justify p-2 border rounded h-32'
                            name="biography"
                        />
                        <SaveButton />
                    
                    </form>
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

