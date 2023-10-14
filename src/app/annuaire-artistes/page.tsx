'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import axiosInstance from '@/src/utils/axios';
import AlphabetFilter from '@/src/components/AlphabetFilter/AlphabetFilter';
import SearchBarAnnuaire from '@/src/components/SearchBarAnnuaire/SearchBarAnnuaire';

interface Artist {
  id: number;
  nickname: string;
  firstname: string;
  lastname: string;
  avatar: string;
}

export default function Annuaire() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAlphabetSearch, setIsAlphabetSearch] = useState(false);

  useEffect(() => {
    axiosInstance.get('/users/creator')
      .then((response) => {
        console.log(response.data);
        setArtists(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des artistes:', error);
      });
  }, []);

  const handleSearchInputChange = (query: string) => {
    setSearchQuery(query);
    setIsAlphabetSearch(false);
  };

  const handleLetterClick = (letter: string) => {
    setSearchQuery(letter);
    setIsAlphabetSearch(true);
  };

  const filteredArtists = artists.filter((artist) => artist.nickname.toLowerCase().includes(searchQuery.toLowerCase()));

  const filteredArtistsByLetter = artists.filter((artist) => artist.nickname.toLowerCase().startsWith(searchQuery.toLowerCase()));

  return (
    <main className="flex h-[75vh] flex-col items-center gap-4 pl-8 pr-8 pt-24">
      <h1 className="text-center text-xl sm:text-2xl font-bold pb-4 sm:pb-10">
        Annuaire des artistes
      </h1>
      <div className="pb-3">
        <SearchBarAnnuaire searchQuery={searchQuery} setSearchQuery={handleSearchInputChange} />
      </div>
      <AlphabetFilter onLetterClick={handleLetterClick} />

      {(searchQuery && (isAlphabetSearch ? filteredArtistsByLetter : filteredArtists).length > 0) && (
      <div className="flex flex-col md:flex-row gap-5 results-container mt-5">
        {(isAlphabetSearch ? filteredArtistsByLetter : filteredArtists).map((artist) => (
          <div key={artist.id} className="flex flex-col items-center">
            <Link
              href={localStorage.getItem('id') === artist.id.toString() ? '/mon-profil-artiste' : `/artist/${artist.id}`}
              className="flex flex-col items-center"
            >
              <div className="w-24 h-24 rounded-full overflow-hidden relative mb-2">
                <img
                  src={artist.avatar}
                  alt={artist.nickname}
                  className="absolute top-50% left-50% transform translate--50% translate-y--50% w-full h-full object-cover"
                />
              </div>
              <span className="block text-center">{artist.nickname}</span>
            </Link>
          </div>
        ))}
      </div>
      )}
    </main>
  );
}
