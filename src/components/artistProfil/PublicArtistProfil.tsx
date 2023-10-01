'use client';

import React from 'react';
import ModifyButton from '../Buttons/ModifyButton';
import LikeButton from '../Buttons/LikeButton';
import addRound from "../../assets/images/addRound.png"
import Image from 'next/image';

const PublicArtistProfil = () => {
  return (
    <div className='relative'>
      <div className='absolute top-0 right-0 m-1'>
      <ModifyButton  />
      </div>
      <div className='flex'>
      <div className='m-1'>
        <Image src={addRound} alt=""/>
      </div>
      <div className='flex justify-center flex-col'>
        <h2 className='text-3xl font-bold mb-3'>Martin DUPONT</h2> 
        <div className='text-2xl'>
        <span >Métier -</span>
        <span>Ville, </span>
        <span>Pays</span>
        </div>
        <div className='ml-0'>
        <button>Ajouter une biographie</button>
        </div>
        <div className='m-2 mt-3'>
          <LikeButton />
          <span className='m-4'>Ajouter 5 tags maximum</span>
        </div>
      </div>
      </div>
      <p className='absolute bottom-0 right-0 m-1'>informations publiques</p>
    </div>
  );
};

export default PublicArtistProfil;
