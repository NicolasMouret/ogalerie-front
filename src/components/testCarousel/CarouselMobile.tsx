'use client';

import { MdOutlineSwipe } from 'react-icons/md';
import SlideMobile from './SlideMobile';
import { Collection } from '@/src/@types';

interface CarouselMobileProps {
  collection: Collection;
}

export default function CarouselMobile({ collection }: CarouselMobileProps) {
  const { artworks } = collection;
  // Je créé un tableau de slides en utilisant le tableau d'images
  const slides = artworks.map((artwork) => <SlideMobile key={artwork.id} artworkId={artwork.id.toLocaleString()} url={artwork.uri} />);

  return (
    // Cette div contient le carousel en entier et les boutons de nav sont positionnés par rappport à elle
    <div className="relative w-screen">
      {/* Cette div permet de délimiter ce que l'on peut voir de la div qu'elle contient */}
      <div className="w-[90vw] mx-auto overflow-hidden ">
        {/* Cette div contient toute les images 'à la suite' le translate permet
          de se déplacer horizontalement entre celle si comme si l'on faisait défiler un bandeau d'images */}
        <div
          className="flex ease-out duration-500 overflow-x-auto scrollbar-hide touch-pan-x snap-x snap-mandatory"
        >
          {slides}
        </div>
        {/*-----*/}
      </div>
      <div className="mt-2 flex justify-center">
        <MdOutlineSwipe className="text-3xl" />
      </div>
    </div>

  );
}
