"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/src/utils/axios";
import { useRouter } from "next/navigation";
import Carousel from "@/src/components/testCarousel/Carousel";
import SearchBar from "@/src/components/SearchBar/SearchBar";
import FilterGalerieButton from '../components/Buttons/FilterGalerieButton';
import Filter from '../components/Filter/Filter';
import { Collection, Artwork } from "@/src/@types";

export default function Home() {
  const router = useRouter();
  const [collectionRandom, setCollectionRandom] = useState<Collection>();
  const [collectionSearch, setCollectionSearch] = useState<Collection>();
  const [artworkResults, setArtworkResults] = useState<Artwork[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    axiosInstance.get<Artwork[]>("/artworks")
      .then(res => {
        setArtworkResults(res.data);
      }).catch(err => {
        console.log(err);
        throw err;
      }
    );
  }, [])

  const handleSearchChange = (query: string) => {
    const filteredArtworks = artworkResults.filter((artwork) =>
        artwork.title.toLowerCase().includes(query.toLowerCase()) ||
      artwork.owner.toLowerCase().includes(query.toLowerCase())
    );
    setCollectionSearch({
      id: 2,
      title: "Search",
      artworks: filteredArtworks
    })
}

  useEffect(() => {
    const getRandomArtworks = () => {
      axiosInstance.get<Artwork[]>("/artworks/random")
        .then(res => {
          console.log("res.random", res.data);
          setCollectionRandom({
            id: 1,
            title: "Random",
            artworks: res.data
          })
        }).catch(err => {
          console.log(err);
          throw err;
        }
      );
  }
  getRandomArtworks();
  }
  , []);       

  const handleClick = () => {
    setIsOpen(true);
    router.replace('/', undefined)
  };

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <>
      <section className="h-[75vh] flex flex-col items-center justify-center sm:gap-8">   
      <div className="mx-auto w-[84vw] flex flex-col gap-4 md:flex-row justify-between items-center">
          {/* Div contenant la SearchBar (reste au milieu) */}  
            <div className="PLACEHOLDER w-[30%]"></div>        
            <SearchBar onSearchChange={handleSearchChange} />
            <FilterGalerieButton onClick={handleClick} />                                     
            {isOpen ? <Filter setCollectionSearch={setCollectionSearch} handleClose={handleClose} /> : null}
        </div>      
        {collectionRandom && !collectionSearch && <Carousel collectionId="1" collection={collectionRandom} page="home"/>}  
        {collectionSearch && collectionSearch.artworks.length > 0 && <Carousel collectionId="1" collection={collectionSearch} page="home"/>} 
      </section>
    </>
  );
}