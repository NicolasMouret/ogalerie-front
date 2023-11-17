'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axiosInstance from '@/src/utils/axios';
import Carousel from '@/src/components/testCarousel/Carousel';
import SearchBar from '@/src/components/SearchBar/SearchBar';
import FilterGalerieButton from '../components/Buttons/FilterGalerieButton';
import Filter from '../components/Filter/FilterSelect';
import { Collection, Artwork } from '@/src/@types';

export default function Home() {
  const searchParams = useSearchParams();
  const [collectionSearch, setCollectionSearch] = useState<Collection>();
  const [allArtworks, setAllArtworks] = useState<Artwork[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const getRandomArtworks = () => {
    axiosInstance.get<Artwork[]>('/artworks/random')
      .then((res) => {
        console.log('res.random', res.data);
        setCollectionSearch({
          id: 1,
          title: 'Random',
          artworks: res.data,
        });
      }).catch((err) => {
        console.log(err);
        throw err;
      });
  };

  const handleSearchChange = (query: string) => {
    if (query) {
      const filteredArtworks = allArtworks.filter((artwork) => artwork.title.toLowerCase().includes(query.toLowerCase())
      || artwork.owner.toLowerCase().includes(query.toLowerCase()));
      setCollectionSearch({
        id: 2,
        title: 'Search',
        artworks: filteredArtworks,
      });
    } else {
      getRandomArtworks();
    }
  };

  const getSearchResults = (searchParams: string) => {
    axiosInstance.get<Artwork[]>(`/artworks/filter/?${searchParams}`)
      .then((res) => {
        setCollectionSearch({
          id: 2,
          title: 'SearchResult',
          artworks: res.data,
        });
      }).catch((err) => {
        throw err;
      });
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

  useEffect(
    () => {
      if (searchParams.toString()) {
        getSearchResults(searchParams.toString());
      } else {
        getRandomArtworks();
      }
    },
    [searchParams],
  );

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
        {collectionSearch && collectionSearch.artworks.length > 0 && <Carousel collectionId="1" collection={collectionSearch} page="home" />}
      </section>
    </>
  );
}
