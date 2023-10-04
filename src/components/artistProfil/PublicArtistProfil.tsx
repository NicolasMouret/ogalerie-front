'use client';

import React from 'react';
import ModifyButton from '../Buttons/ModifyButton';
import LikeButton from '../Buttons/LikeButton';
import addRound from "../../assets/images/addRound.png"
import Image from 'next/image';
import { useState } from 'react';

const PublicArtistProfil = () => {
  const [lastNameState, setLastName] = useState("");
  const [firstNameState, setFirstName] = useState("");
  const [jobState, setJobState] = useState("");
  const [townState, setTownState] = useState("");
  const [countryState, setCountryState] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div className='relative'>
      <div className='flex'>
        <div className='m-1'>
          <Image src={addRound} alt="" />
        </div>
        <div className='absolute top-0 right-0 m-2'>
          <ModifyButton onClick={() => setIsEditing(!isEditing)} />
        </div>
        {isEditing ? (
          <div>
            <div>
              <span className='font-bold ml-2'>Nom :</span>
              <input
                type="text"
                value={lastNameState}
                onChange={(e) => setLastName(e.target.value)}
                className='p-2 border rounded'
              />
            </div>

            <div>
              <span className='font-bold ml-2'>Prénom :</span>
              <input
                type="text"
                value={firstNameState}
                onChange={(e) => setFirstName(e.target.value)}
                className='p-2 border rounded'
              />
            </div>

            <div>
              <span className='font-bold ml-2'>Métier :</span>
              <input
                type="text"
                value={jobState}
                onChange={(e) => setJobState(e.target.value)}
                className='p-2 border rounded'
              />
            </div>

            <div>
              <span className='font-bold ml-2'>Ville :</span>
              <input
                type="text"
                value={townState}
                onChange={(e) => setTownState(e.target.value)}
                className='p-2 border rounded'
              />
            </div>

            <div>
              <span className='font-bold ml-2'>Pays :</span>
              <input
                type="text"
                value={countryState}
                onChange={(e) => setCountryState(e.target.value)}
                className='p-2 border rounded'
              />
            </div>
          </div>
        ) : (
          <div className='flex justify-center flex-col'>
            <h2 className='text-3xl font-bold mb-3'>{firstNameState} {lastNameState}</h2>
            <div className='text-2xl'>
              <span >{jobState}Métier</span>
              <span>{townState}, Ville -</span>
              <span>{countryState} Pays</span>
            </div>
            <div className='ml-0'>
              <button>Ajouter une biographie</button>
            </div>
          </div>
        )}
      </div>
      <div className='m-2 mt-3'>
        <LikeButton />
        <span className='m-4'>Ajouter 5 tags maximum</span>
      </div>
      <p className='absolute bottom-0 right-0 m-2'>informations publiques</p>
    </div>
  );
};

export default PublicArtistProfil;