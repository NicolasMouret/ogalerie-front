'use client';
import axiosInstance from '@/src/utils/axios';
import { notFound } from 'next/navigation';
import Carousel from "@/src/components/testCarousel/Carousel";
import UserPublicInfos from "@/src/components/UserProfilPublic/UserPublicInfos";
import { useEffect, useState, useRef } from 'react';
import { Collection, Artwork } from "@/src/@types";


interface UserPublicProps {
  params: {
    id: string;
  }
}

const imageList = [
  { 
    id: "1",
    url: "https://picsum.photos/id/950/5000/3333"
},
  {
  id: "2",
  url: "https://picsum.photos/id/306/1024/768",
},
  {
    id: "3",
  url: "https://picsum.photos/id/791/5000/3333"
},

  {
    id: "4",
  url: "https://picsum.photos/id/1073/5000/3333"
},

  {
    id: "5",
  url: "https://picsum.photos//id/947/5000/3333"
},

  {
    id: "6",
  url: "https://picsum.photos/id/855/5000/3333"
},

  {
    id: "7",
  url: "https://picsum.photos/id/783/4096/2731"
},

  {
    id: "8",
  url: "https://picsum.photos//id/867/4288/2848"
},
  
  {
    id: "9",
  url: "https://picsum.photos/id/846/4000/3000"
},
  { 
    id: "10",
    url: "https://picsum.photos/id/881/3000/2000"
},
  {
  id: "11",
  url: "https://picsum.photos/id/723/5000/3333",
},
  {
    id: "12",
  url: "https://picsum.photos/id/679/2448/2448"
},

  {
    id: "13",
  url: "https://picsum.photos/id/639/2365/1774"
},

];

export default function UserPublic({params}: UserPublicProps) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [isNotFound, setIsNotFound] = useState<boolean>(false);
  const [ userLocal, setUserLocal] = useState<any>();
  const [ favoris, setFavoris] = useState<Collection>();
  
  
  useEffect(() => {
    const getUser = (id: string) => {
      axiosInstance.get(`/users/${id}`)
      .then(res => {
        console.log(res.data);
        setUserLocal(res.data);
      }).catch(err => {
        setIsNotFound(true);
        console.log(err);
      })
    }
    getUser(params.id);
  }
  , []);

  useEffect(() => {
    const getcollections = (id: string) => {
        axiosInstance.get<Artwork[]>(`/users/${id}/favorites`)
        .then(res => {
            console.log("res.data collections", res.data);
            setFavoris({
              id: 1,
              title: "Favoris",
              artworks: res.data
            });                   
        }).catch(err => {
            console.log(err);
            throw err;
        })
    }
    getcollections(params.id);
  }
  , []);

  if (isNotFound) {
    notFound();
  }

  return (
    <>
    {userLocal && favoris && 
    <main className="h-[85vh] flex flex-col" ref={scrollContainerRef}>     
        <div className="flex flex-col gap-4 md:gap-8 mx-4 md:mx-auto md:w-[85vw] md:h-[40%] md:items-center md:flex-row md:py-2 sm:py-4">
          <div className="md:w-2/3">
            <UserPublicInfos 
              nickname={userLocal.nickname}
              biography={userLocal.biography}
              avatar={userLocal.avatar}
              town={userLocal.town}
              country={userLocal.country}
              likedCount={userLocal.like}
            /> 
          </div>  
        </div>
        <section className="sm:flex-grow flex flex-col justify-start pt-4">
          <>
            <h3 className="text-xl font-extrabold sm:mx-auto w-[84vw] text-left py-4">Oeuvres ajoutées aux favoris</h3>                      
            <Carousel collectionId="1" collection={favoris} page="user" />     
          </>       
        </section>
  </main> }  
    </>
           
  );
}

