"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/src/utils/axios";
import Carousel from "@/src/components/testCarousel/Carousel";
import SearchBar from "@/src/components/SearchBar/SearchBar";
import { Collection, Artwork } from "@/src/@types";

const imageList = [
  { 
    id: "1",
    url: "https://picsum.photos/id/184/310/320"
},
  {
  id: "2",
  url: "https://picsum.photos/id/122/360/350",
},
  {
    id: "3",
  url: "https://picsum.photos/id/123/330/330"
},

  {
    id: "4",
  url: "https://picsum.photos/id/124/380/360"
},

  {
    id: "5",
  url: "https://picsum.photos/id/125/320/330"
},

  {
    id: "6",
  url: "https://picsum.photos/id/126/350/350"
},

  {
    id: "7",
  url: "https://picsum.photos/id/135/350/350"
},

  {
    id: "8",
  url: "https://picsum.photos/id/129/350/350"
},
  
  {
    id: "9",
  url: "https://picsum.photos/id/154/350/350"
},
  { 
    id: "10",
    url: "https://picsum.photos/id/121/310/320"
},
  {
  id: "11",
  url: "https://picsum.photos/id/122/360/350",
},
  {
    id: "12",
  url: "https://picsum.photos/id/123/330/330"
},

  {
    id: "13",
  url: "https://picsum.photos/id/124/380/360"
},

  {
    id: "14",
  url: "https://picsum.photos/id/125/320/330"
},
    { 
    id: "15",
    url: "https://picsum.photos/id/121/310/320"
},
  {
  id: "16",
  url: "https://picsum.photos/id/122/360/350",
},
  {
    id: "17",
  url: "https://picsum.photos/id/123/330/330"
},

  {
    id: "18",
  url: "https://picsum.photos/id/124/380/360"
},

  {
    id: "19",
  url: "https://picsum.photos/id/125/320/330"
},

];

export default function Home() {

  const [artworkResults, setArtworkResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    
    axiosInstance.get(`/artworks`)
        .then(response => {
            setArtworkResults(response.data);
        })
        .catch(error => {
            console.error("Erreur lors de la recherche :", error);
        });
}

  const filteredArtworks = artworkResults.filter(artwork =>
     artwork.title.toLowerCase().includes(searchQuery.toLowerCase())
    //  (artwork.description && artwork.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
    //  (artwork.artist.firstname && artwork.firstname.toLowerCase().includes(searchQuery.toLowerCase()))
    //  (artwork.artist.lastname && artwork.firstname.toLowerCase().includes(searchQuery.toLowerCase()))
    //  (artwork.artist.nickname && artwork.artist.nickname.toLowerCase().includes(searchQuery.toLowerCase()))


  );
  
  const [collection, setCollection] = useState<Collection>();

  useEffect(() => {
    const getRandomArtworks = () => {
      axiosInstance.get<Artwork[]>("/artworks/random")
        .then(res => {
          console.log("res.random", res.data);
          setCollection({
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
        <div className="artworks-results">
          {filteredArtworks.map(artwork => (
            <img key={artwork.id} src={artwork.uri} alt={`Artwork ${artwork.id}`} />
          ))}
        </div>
        {collection && <Carousel collection={collection} page="home"/>}        
      </section>
    </>
  );
}
