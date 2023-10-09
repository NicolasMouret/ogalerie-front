'use client';
import axiosInstance from '@/src/utils/axios';
import { useEffect, useRef, useState } from 'react';
import Carousel from "@/src/components/testCarousel/Carousel";
import ArtistPublicInfos from '@/src/components/ArtistProfilPublic/ArtistPublicInfos';
import ContactArtistPublic from '@/src/components/ArtistProfilPublic/ContactArtistPublic';
import { Collection } from "@/src/@types";
import ScrollButton from '@/src/components/Buttons/ScrollButton';


interface ArtistPublicProps {
  params: {
    id: string;
  }
}

export default function ArtistPublic({params}: ArtistPublicProps) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [ userLocal, setUserLocal] = useState<any>();
  const [ collections, setCollections] = useState<Collection[]>();
  const [ collectionsFullScreen, setCollectionsFullScreen] = useState<Collection[]>();

  useEffect(() => {
    const getUser = (id: string) => {
      axiosInstance.get(`/users/${id}`)
      .then(res => {
        console.log(res.data);
        setUserLocal(res.data);
      }).catch(err => {
        console.log(err);
        throw err;
      })
    }
    getUser(params.id);
  }
  , []);

  useEffect(() => {
    const getcollections = (id: string) => {
        axiosInstance.get<Collection[]>(`/users/${id}/collections`)
        .then(res => {
            console.log("res.data collections", res.data);
            setCollections(res.data); 
            setCollectionsFullScreen(res.data.slice(1));                  
        }).catch(err => {
            console.log(err);
            throw err;
        })
    }
    getcollections(params.id);
  }
  , []);

  const scrollToNextViewport = () => {
    if (scrollContainerRef.current) {     
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollTop + window.innerHeight,
        behavior: "smooth",
      });
    }
  };

  const scrollToPreviousViewport = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollTop - window.innerHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
    {userLocal && collections && collectionsFullScreen &&
    <main className="overflow-auto snap-y snap-mandatory h-[85vh]" ref={scrollContainerRef}>
    <div className="sm:h-screen snap-start">
    <div className="flex flex-col gap-4 md:gap-8 mx-4 md:mx-auto md:w-[85vw] md:flex-row md:py-2 sm:py-4">
      <div className="md:w-1/2">
      <ArtistPublicInfos 
        nickname={userLocal.nickname}
        town={userLocal.town}
        country={userLocal.country}
        biography={userLocal.biography}
        avatar={userLocal.avatar}
        likedCount={userLocal.likedCount}
      />
      </div>
      <div className="md:w-1/2"> 
      <ContactArtistPublic />
      </div>
    </div>
    <section className="sm:flex-grow h-[85vh] ">
      <div className="flex flex-col gap-4 items-start w-[90vw] py-2 md:w-[84vw] mx-auto">
        {collections.length > 0 && <h3 className="text-xl font-extrabold sm:mr-16">Collection : {collections[0].title}</h3> }     
      </div>
      {collections.length > 0 && 
      <>
      <Carousel collection={collections[0]} page="user" addButton />     
      <ScrollButton className="mt-4" direction="down" onClick={scrollToNextViewport} />
      </> }        
    </section>
    </div>
  
  
  {collectionsFullScreen.map((collection, index) => (
    <section key={index} className="flex flex-col items-center justify-around h-[85vh] snap-start" >
      <ScrollButton direction="up" onClick={scrollToPreviousViewport} />        
        <div>
          <h3 className="w-[90vw] py-4 md:w-[84vw] text-xl font-extrabold mx-auto">
            {collection.title}
          </h3>
          <Carousel collection={collection} page="user" addButton />
        </div>  
      {index < collectionsFullScreen.length - 1 && (<ScrollButton direction="down" onClick={scrollToNextViewport} />)}
    </section>
  ))}
  </main> }  
    </>
           
  );
}