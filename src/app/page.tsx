'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axiosInstance from '@/src/utils/axios';
import Carousel from '@/src/components/testCarousel/Carousel';
import SearchBar from '@/src/components/SearchBar/SearchBar';
import FilterGalerieButton from '../components/Buttons/FilterGalerieButton';
import Filter from '../components/Filter/FilterSelect';
import { getFilteredArtworks } from '../utils/filterMethods';
import { getRandomArtworks } from '../utils/searchMethods';
import { Collection, Artwork } from '@/src/@types';

export default function Home() {
  const searchParams = useSearchParams();
  const [currentCollection, setCurrentCollection] = useState<Collection>(
    {
      id: 1,
      title: 'HomeCollection',
      artworks: [],
    },
  );
  const [allArtworks, setAllArtworks] = useState<Artwork[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleSearchChange = (query: string) => {
    if (query) {
      const filteredArtworks = allArtworks.filter((artwork) => artwork.title.toLowerCase().includes(query.toLowerCase())
      || artwork.owner.toLowerCase().includes(query.toLowerCase()));
      setCurrentCollection({
        id: 1,
        title: 'Search',
        artworks: filteredArtworks,
      });
    } else {
      getRandomArtworks();
    }
  };

  useEffect(() => {
    axiosInstance.get<Artwork[]>('/artworks')
      .then((res) => {
        setAllArtworks(res.data);
      }).catch((err) => {
        console.log(err);
        throw err;
      });
  }, []);

  useEffect(() => {
    const getFilteredOrRandomArtworks = async () => {
      if (searchParams.toString()) {
        const filteredArtworks = await getFilteredArtworks(searchParams);
        setCurrentCollection((currentCollection) => ({
          ...currentCollection,
          artworks: filteredArtworks as Artwork[],
        }));
      } else {
        const randomArtworks = await getRandomArtworks();
        setCurrentCollection((currentCollection) => ({
          ...currentCollection,
          artworks: randomArtworks as Artwork[],
        }));
      }
    };
    getFilteredOrRandomArtworks();
  }, [searchParams]);

  return (
    <>
      <section className="h-[75vh] flex flex-col items-center justify-center sm:gap-8">
        <div className="mx-auto w-[84vw] flex flex-col gap-4 md:flex-row justify-center items-center">
          {/* Div contenant la SearchBar (reste au milieu) */}
          <div className="PLACEHOLDER w-[30%]" />
          <SearchBar onSearchChange={handleSearchChange} />
          <FilterGalerieButton setIsOpen={setIsOpen} isOpen={isOpen} />
        </div>
        {isOpen ? <Filter /> : null}
        {currentCollection && currentCollection.artworks.length > 0 && <Carousel collectionId="1" collection={currentCollection} page="home" />}
      </section>
    </>
  );
}
