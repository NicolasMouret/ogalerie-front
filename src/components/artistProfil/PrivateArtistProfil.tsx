"use client"

import React from 'react'
import ModifyButton from '../Buttons/ModifyButton'

const PrivateArtistProfil = () => {
  return (
    <div className='relative flex flex-col'>
      <div className='absolute top-0 right-0'>
      <ModifyButton />
      </div>
      <div className='flex justify-center flex-col'>
    <div>Nom: DUPONT</div>
    <div>Prénom: Martin</div>
    <div>Date de naissance: 18/03/1993</div>
</div>
<div>
<button>supprimer mon compte</button>
</div>
<div>
<p>informations privées</p>
</div>
    </div>
  )
}

export default PrivateArtistProfil