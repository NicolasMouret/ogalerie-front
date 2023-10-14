'use client';

import { useEffect, useState } from 'react';

import SlideDesktop from './SlideDesktop';
import CarouselButton from '../Buttons/CarouselButton';
import AddArtworkButton from '../Buttons/addArtworkButton';
import { Collection } from '@/src/@types';

interface CarouselDesktopProps {
  collection: Collection;
  page: string;
  onClick: () => void;
  addButton? : boolean;
}

// Le carousel desktop est similaire au mobile mais prend en plus
// le prop page (home/user) pour déterminer la taille des images
export default function CarouselDesktop({
  collection, page, onClick, addButton,
}: CarouselDesktopProps) {
  const { artworks } = collection;
  // Je créé un tableau de slides en utilisant le tableau d'images
  const slides = artworks.map((artwork) => <SlideDesktop key={artwork.id} artworkId={artwork.id.toString()} url={artwork.uri} page={page} />);
  if (addButton) {
    const add = () => <AddArtworkButton key="addDesktop" screen="desktop" onClick={onClick} />;
    // ajouter en premier élément du tableau slides
    slides.unshift(add());
  }
  // currentSlide est un state qui permet d'avoir un index 'symboliques' pour les images,
  // même s'il ne correspond pas réellement à l'index de l'image dans le tableau
  const [currentSlide, setCurrentSlide] = useState(0);
  // slidesEnd et slidesStart sont des states qui permettent de savoir si on est au début ou à la fin du carousel
  // Ils sont utilisés pour cacher les boutons de navigation
  const [slidesEnd, setSlidesEnd] = useState(false);
  const [slidesStart, setSlidesStart] = useState(true);

  useEffect(() => {
    // En fonction du page, currentSlide des groupes de 3 ou 4 images
    // A la page user, si j'ai 6 images, le currentSlide 0 correspondra aux images 1, 2 et 3
    // Le currentSlide 1 correspondra aux images 4, 5 et 6 et sera donc le dernier
    if (page === 'user') {
      // Avec 9 images par exemple, je veux que le currentSlide 2 soit le dernier
      // Je divise donc la longueur du tableau par 3 et je soustrais 1 = 2
      // Si currentSlide est supérieur ou égal à 2, je set slidesEnd à true
      if (currentSlide >= (slides.length / 3) - 1) {
        setSlidesEnd(true);
      } else {
        setSlidesEnd(false);
      }
    }
    // Même logique pour 4 images
    if (page === 'home') {
      if (currentSlide >= (slides.length / 4) - 1) {
        setSlidesEnd(true);
      } else {
        setSlidesEnd(false);
      }
    }
    // Je check si l'index est égal à 0 donc au début du carousel
    // Si c'est le cas, je set slidesStart à true
    if (currentSlide === 0) {
      setSlidesStart(true);
    } else {
      setSlidesStart(false);
    }
  }, [currentSlide]);

  // previousSlide et nextSlide permettent de changer l'index (valeur de currentSlide)
  const previousSlide = () => {
    setCurrentSlide(currentSlide - 1);
  };

  const nextSlide = () => {
    setCurrentSlide(currentSlide + 1);
    console.log(currentSlide);
    console.log(slides.length);
  };

  return (
    <div className="relative w-[84vw] mx-auto">
      <div className="mx-auto w-[84vw] overflow-hidden">
        <div
          className="flex transition-transform ease-out duration-500 "
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides}
        </div>
      </div>
      <CarouselButton direction="left" className={` text-4xl absolute -left-4 top-1/2 -translate-y-1/2 ${slidesStart ? 'hidden' : ''}`} onClick={previousSlide} />
      <CarouselButton direction="right" className={` text-4xl absolute -right-4 top-1/2 -translate-y-1/2 ${slidesEnd ? 'hidden' : ''}`} onClick={nextSlide} />
    </div>

  );
}

CarouselDesktop.defaultProps = {
  addButton: false,
};
