'use client';

import React from 'react';
import PrivateArtistProfil from '@/src/components/artistProfil/PrivateArtistProfil';
import PublicArtistProfil from '@/src/components/artistProfil/PublicArtistProfil';
import CarouselDesktop from '@/src/components/testCarousel/CarouselDesktop';

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
      <section className="h-3/5 flex">
        <div className='w-2/5 border 
        border-black border-solid 
        ml-20
        mr-4'>
          <PublicArtistProfil />
        </div>

        <div className='w-2/5 border
         border-black border-solid'>
          <PrivateArtistProfil />
        </div>
      </section>

      <section className="h-2/5">
        <h3>Titre de votre collection</h3>
        <CarouselDesktop imageList={imageList} page="artistprivateprofil" />
      </section>
      <section className="h-1/5">
        <h3>Créer une nouvelle collection</h3>
      </section>
    </>
  );
}
