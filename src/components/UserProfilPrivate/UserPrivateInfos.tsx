"use client";

import React, { useState, useContext } from 'react';
import { UserContext } from '@/src/contexts/UserContext';
import axiosInstance from '@/src/utils/axios';
import ModifyButton from '../Buttons/ModifyButton';
import SaveButton from '../Buttons/SaveButton';
import DeleteModal from './DeleteModal';
import Link from 'next/link';

interface UserPrivateInfosProps {
    lastname: string;
    firstname: string;
    birthday: string;
    email: string;
}

export default function UserPrivateInfos({ 
    lastname,
    firstname,
    birthday,
    email,
}: UserPrivateInfosProps) {
  const {user, setUser} = useContext(UserContext);
  
  const [lastnameState, setLastnameState] = useState(lastname);
  const [firstnameState, setFirstnameState] = useState(firstname);
  const [isEditing, setIsEditingState] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteConfirm = () => {
    setIsModalOpen(false);
    axiosInstance.delete(`/users/${user.id}`)
      .then((res) => {
        console.log(res.data);
        setUser({logged: false});
        localStorage.removeItem('OgToken');
        localStorage.removeItem('id');
        localStorage.removeItem('nickname');
        localStorage.removeItem('avatar');
        delete axiosInstance.defaults.headers.common.Authorization;
      }).catch((err) => {
        console.log(err);
        throw err;
      });
      console.log("delete");    
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsEditingState(false);

    const form = e.currentTarget;
    const formData = new FormData(form);

    if(!formData.get('lastname')) formData.delete('lastname');
    if(!formData.get('firstname')) formData.delete('firstname');
    if(!formData.get('birthday')) formData.delete('birthday');
    if(!formData.get('email')) formData.delete('email');

    const objData = Object.fromEntries(formData);      

    axiosInstance.patch(`/users/${user.id}`, objData)
        .then((res) => {
            console.log(res.data);
            delete res.data.birthday
            setUser({...user, ...res.data});
        }).catch((err) => {
            console.log(err);
            throw err;
        });
}

  return (
    <div className='flex flex-col md:flex-row border-2 rounded-xl mx-auto max-w-3xl pt-8 pb-5 pr-5 relative'> 
      <div className='w-full mx-auto flex flex-col justify-center ml-4'> 
        <div className="absolute top-2 right-2">
          <ModifyButton onClick={() => setIsEditingState(!isEditing)} />
        </div>

        {isEditing ? (
          <>
            <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className='my-1'>
              <span className='font-bold ml-2'>Nom : </span>
              <input 
                type="text" 
                placeholder="Nom"
                value={lastnameState} 
                onChange={(e) => setLastnameState(e.target.value)} 
                className='p-2 border rounded' 
                name="lastname"
              />
            </div>
            <div className='my-1'>
              <span className='font-bold ml-2'>Prénom : </span>
              <input 
                type="text" 
                placeholder="Prénom"
                value={firstnameState} 
                onChange={(e) => setFirstnameState(e.target.value)} 
                className='p-2 border rounded' 
                name="firstname"
              />
            </div>
            {/* <div className='my-1'>
              <span className='font-bold ml-2'>Date de naissance : </span>
              <input 
                type="text" 
                placeholder="Date de naissance"
                value={birthdayState} 
                onChange={(e) => setBirthdayState(e.target.value)} 
                className='p-2 border rounded' 
                name="birthday"
              />
            </div> */}
            <SaveButton  />
            </form>
          </>
        ) : (
          <>
            <div className='my-1'>
              <span className='font-bold ml-2'>NOM : </span>{lastname}
            </div>
            <div className='my-1'>
              <span className='font-bold ml-2'>Prénom : </span>{firstname}
            </div>
            <div className='my-1'>
              <span className='font-bold ml-2'>Date de naissance : </span>{birthday}
            </div>
            <div className='my-1'>
              <span className='font-bold ml-2'>Email : </span>{email}
            </div>
          </>
        )}

        <div className='flex justify-between items-center mt-12'>
        <button
            className='underline-offset-1 underline hover:font-bold'
            onClick={() => setIsModalOpen(true)}
        >
            Supprimer mon compte
        </button>
          <p className='text-gray-400'>Informations privées</p>
        </div>

        <DeleteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <h2 className="text-xl font-bold">Confirmation de la suppresion</h2>
            <p className="text-gray-600">Êtes-vous sûr de vouloir supprimer votre compte ?</p>
            <div className="flex justify-end space-x-4 mt-6">
                <button 
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border rounded-md hover:bg-gray-100"
                >
                    Annuler
                </button>
                <Link
                    href="/"
                    onClick={handleDeleteConfirm}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                    Confirmer
                </Link>
            </div>
        </DeleteModal>
      </div>
    </div>
  );
};

