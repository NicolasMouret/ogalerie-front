"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/src/utils/axios";
import Carousel from "@/src/components/testCarousel/Carousel";
import SearchBar from "@/src/components/SearchBar/SearchBar";
import { Collection, Artwork } from "@/src/@types";

export default function Home() {
  const [collectionRandom, setCollectionRandom] = useState<Collection>();
  const [collectionSearch, setCollectionSearch] = useState<Collection>();
  const [artworkResults, setArtworkResults] = useState<Artwork[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

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

  return (
    <>
      <section className="h-[75vh] flex flex-col items-center justify-center space-y-4">        
        <SearchBar onSearchChange={handleSearchChange} /> 
        {collectionRandom && !collectionSearch && <Carousel collection={collectionRandom} page="home"/>}  
        {collectionSearch && collectionSearch.artworks.length > 0 && <Carousel collection={collectionSearch} page="home"/>}      
      </section>
    </>
  );
}
