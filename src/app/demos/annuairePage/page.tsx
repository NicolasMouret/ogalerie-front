"use client";

import { useState, useEffect } from 'react';
import axiosInstance from '@/src/utils/axios';
import AlphabetFilter from '@/src/components/AlphabetFilter/AlphabetFilter';
import SearchBar from '../../../components/SearchBar/SearchBar';
import ArtistCarousel from '@/src/components/ArtistCarrousel/ArtistCarrousel';

export default function Annuaire() {
  const [artists, setArtists] = useState([]);
  const [filteredArtists, setFilteredArtists] = useState([])
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axiosInstance.get('/users/creator')
        .then(response => {
            console.log(response.data)
            setArtists(response.data);
            setFilteredArtists(response.data); 
        })
        .catch(error => {
            console.error("Erreur lors de la récupération des artistes:", error);
        });
}, []);

  const handleLetterSelect = (letter) => {
    const filtered = artists.filter(artist => artist.nickname[0].toUpperCase() === letter);
    console.log("Filtered Artists by Letter:", filtered); 
    setFilteredArtists(filtered);
  };

  const filteredBySearch = filteredArtists.filter((artist) =>
  artist.nickname.toLowerCase().includes(searchQuery.toLowerCase())
);

  return (
    <>
      <main className="flex h-[75vh] flex-col items-center gap-4 p-24">
        <h1 className="text-2xl font-bold pb-10">
          Annuaire des artistes
        </h1>
        <div className="pb-3">
          <SearchBar />
        </div>
        <AlphabetFilter onLetterClick={handleLetterSelect} />
        <ArtistCarousel artists={filteredBySearch}/>
      </main>
    </>
  );
}