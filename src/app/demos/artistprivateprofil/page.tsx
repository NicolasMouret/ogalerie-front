'use client';

import React from 'react';
import ModifyButton from '@/src/components/Buttons/ModifyButton';
import PrivateArtistProfil from '@/src/components/artistProfil/PrivateArtistProfil';
import PublicArtistProfil from '@/src/components/artistProfil/PublicArtistProfil';
import Carousel from '@/src/components/testCarousel/Carousel';
import AjoutOeuvre from '@/src/components/artistProfil/AjoutOeuvre';
import AddButton from '@/src/components/Buttons/Addbutton';

export default function ArtistPrivateProfil() {
  const imageList = [
    {
      id: '1',
      url: 'https://picsum.photos/id/121/310/320',
    },
    {
      id: '2',
      url: 'https://picsum.photos/id/122/360/350',
    },
    {
      id: '3',
      url: 'https://picsum.photos/id/123/330/330',
    },

    {
      id: '4',
      url: 'https://picsum.photos/id/124/380/360',
    },
  ];

  return (
    <>
      <section className="h-1/3 flex mt-10">
        <div
          className="w-1/2 border 
        border-black border-solid 
        ml-20
        mr-4"
        >
          <PublicArtistProfil />
        </div>

        <div
          className="w-1/3 border
         border-black border-solid"
        >
          <PrivateArtistProfil />
        </div>
      </section>

      <section className="h-2/3">
      <div className='relative flex ml-20 mt-8 mb-4'>
          <h3 className="text-2xl font-extrabold mr-4">Titre de votre collection</h3>
          {/* <ModifyButton /> */}
        </div>
        <div className='ml-20 h-160 flex'>
        <AjoutOeuvre />
        </div>
      </section>
      <Carousel imageList={imageList} page="user" />
      <section className="">
        <div className="relative flex ml-20 mt-8 mb-4">
          <h3 className="text-2xl font-extrabold mr-4">
            Créer une nouvelle collection
          </h3>
          <AddButton />
        </div>
      </section>
    </>
  );
}
