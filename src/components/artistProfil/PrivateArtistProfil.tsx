'use client';

import React, { useState } from 'react';
import ModifyButton from '../Buttons/ModifyButton';

const PrivateArtistProfil = () => {
  const [lastNameState, setLastname] = useState("");
  const [firstnameState, setFirstname] = useState("");
  const [birthdayState, setBirthday] = useState("");
  const [emailState, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="relative w-full h-full flex flex-col">
      <div className="absolute top-0 right-0 m-2">
        <ModifyButton onClick={() => setIsEditing(!isEditing)} />
      </div>
      {isEditing ? (
        <div className='flex justify-center flex-col h-90 my-auto leading-7'>
          <div>
            <div>
              <span className='font-bold ml-2'>Nom :</span>
              <input type="text" 
              value={lastNameState}
              onChange={(e) => setLastname(e.target.value)}
              className='p-2 border rounded' 
              />
              </div>

              <div>
              <span className='font-bold ml-2'>Prénom :</span>
              <input type="text" 
              value={firstnameState}
              onChange={(e) => setFirstname(e.target.value)}
              className='p-2 border rounded' 
              />
              </div>

              <div>
              <span className='font-bold ml-2'>Date de naissance :</span>
              <input type="text" 
              value={birthdayState}
              onChange={(e) => setBirthday(e.target.value)}
              className='p-2 border rounded' 
              />
              </div>

              <div>
              <span className='font-bold ml-2'>Email :</span>
              <input type="text" 
              value={emailState}
              onChange={(e) => setEmail(e.target.value)}
              className='p-2 border rounded' 
              />
              </div>

          </div>
        </div>
      ) : (
        <div className='flex justify-center flex-col h-90 my-auto leading-7'>
          <div>
            <div><span className='font-bold ml-2'>Nom</span>: </div>
            <div><span className='font-bold ml-2'>Prénom</span>: </div>
            <div><span className='font-bold ml-2'>Date de naissance</span>: </div>
            <div><span className='font-bold ml-2'>Email</span>: </div>
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
