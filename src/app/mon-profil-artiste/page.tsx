"use client";
import { useEffect, useRef, useState } from "react";
import axiosInstance from "@/src/utils/axios";
import Carousel from "@/src/components/testCarousel/Carousel";
import UserPrivateInfos from "@/src/components/UserProfilPrivate/UserPrivateInfos";
import UserPublicInfosPrivateProfile from "@/src/components/UserProfilPrivate/UserPublicInfosPrivateProfile";
import AddArtworkForm from "@/src/components/Forms/AddArtworkForm";
import ScrollButton from "@/src/components/Buttons/ScrollButton";
import AddCollectionButton from "@/src/components/Buttons/AddCollectionButton";


const collection1 = [
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
}
];

const collection2 = [
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
];

const collection3 = [
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
]

const collectionsMock = [collection1, collection2, collection3];
const collectionsMockFullScreen = collectionsMock.slice(1);

export default function UserPrivate() {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [ userLocal, setUserLocal] = useState<any>();
  const [userId, setUserId] = useState('');
  const [ collections, setCollections] = useState([]);

  useEffect(() => {
    setUserId(localStorage.getItem('id')!);
}, []);
  
  useEffect(() => {
    const id = localStorage.getItem('id');
    const getUser = (id: string) => {
      axiosInstance.get(`/users/${id}`)
      .then(res => {
        console.log("res.data", res.data);
        setUserLocal(res.data);
        console.log("biography", res.data.biography.length);
      }).catch(err => {
        console.log(err);
        throw err;
      })
    }
    const getcollections = (id: string) => {
        axiosInstance.get(`/users/${id}/collections`)
        .then(res => {
            console.log("res.data collections", res.data);
            setCollections(res.data);       
        }).catch(err => {
            console.log(err);
            throw err;
        })
    }
    getUser(id!);
    getcollections(id!);
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
    {userLocal && userId &&
    <main className="overflow-auto snap-y snap-mandatory h-[85vh]" ref={scrollContainerRef}>
    <AddArtworkForm collectionId="1"/>
    <div className="sm:h-screen snap-start">
    <div className="flex flex-col gap-4 md:gap-8 mx-4 md:mx-auto md:w-[85vw] md:flex-row md:py-2 sm:py-4">
      <div className="md:w-1/2">
      <UserPublicInfosPrivateProfile 
        nickname={userLocal.nickname} 
        town={userLocal.town} 
        country={userLocal.country} 
        biography={userLocal.biography}
        avatar={userLocal.avatar}
        likedCount={userLocal.like} />
      </div>
      <div className="md:w-1/2"> 
      <UserPrivateInfos 
        lastname={userLocal.lastname} 
        firstname={userLocal.firstname} 
        birthday={userLocal.birthday} 
        email={userLocal.email} />
      </div>
    </div>
    <section className="sm:flex-grow h-[85vh] ">
      <div className="flex flex-col gap-4 items-start w-[90vw] py-2 md:w-[84vw] mx-auto">
        <AddCollectionButton userId={userId} />
        <h3 className="text-xl font-extrabold sm:mr-16">Ma collection</h3>      
      </div>
      <Carousel imageList={collectionsMock[0]} page="user" addButton />     
      <ScrollButton className="mt-4" direction="down" onClick={scrollToNextViewport} />         
    </section>
    </div>
  
  
  {collectionsMockFullScreen.map((collection, index) => (
    <section key={index} className="flex flex-col items-center justify-around h-[85vh] snap-start" >
      <ScrollButton direction="up" onClick={scrollToPreviousViewport} />        
        <div>
          <h3 className="w-[90vw] py-4 md:w-[84vw] text-xl font-extrabold mx-auto">
            Ma collection
          </h3>
          <Carousel imageList={collection} page="user" addButton />
        </div>  
      {index < collectionsMockFullScreen.length - 1 && (<ScrollButton direction="down" onClick={scrollToNextViewport} />)}
    </section>
  ))}
  </main> }  
    </>
           
  );
}