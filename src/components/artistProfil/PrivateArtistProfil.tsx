'use client';

import React, { useState } from 'react';
import ModifyButton from '../Buttons/ModifyButton';

const PrivateArtistProfil = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="relative w-full h-full flex flex-col">
      <div className="absolute top-0 right-0 m-2">
        <ModifyButton onClick={() => setIsEditing(!isEditing)} />
      </div>
      {isEditing ? (
        <div className='flex justify-center flex-col h-90 my-auto leading-7'>
          <div>
            <div><input type="text" /><label htmlFor=""></label> : DUPONT</div>
            <div><span className='font-bold ml-2'>Prénom</span>: Martin</div>
            <div><span className='font-bold ml-2'>Date de naissance</span>: 18/03/1993</div>
            <div><span className='font-bold ml-2'>Email</span>: martindupont@exemple.com</div>
          </div>
        </div>
      ) : (
        <div className='flex justify-center flex-col h-90 my-auto leading-7'>
          <div>
            <div><span className='font-bold ml-2'>Nom</span>: DUPONT</div>
            <div><span className='font-bold ml-2'>Prénom</span>: Martin</div>
            <div><span className='font-bold ml-2'>Date de naissance</span>: 18/03/1993</div>
            <div><span className='font-bold ml-2'>Email</span>: martindupont@exemple.com</div>
          </div>
        </div>
      )}
      <div>
        <button className=' ml-2 mt-3 underline-offset-1'>supprimer mon compte</button>
      </div>
      <div>
        <p className='absolute bottom-0 right-0 m-2'>informations privées</p>
      </div>
    </div>
  );
};

export default PrivateArtistProfil;
