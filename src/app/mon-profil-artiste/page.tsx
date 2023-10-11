"use client";
import { useEffect, useRef, useState } from "react";
import axiosInstance from "@/src/utils/axios";
import Carousel from "@/src/components/testCarousel/Carousel";
import UserPrivateInfos from "@/src/components/UserProfilPrivate/UserPrivateInfos";
import UserPublicInfosPrivateProfile from "@/src/components/UserProfilPrivate/UserPublicInfosPrivateProfile";
import AddArtworkForm from "@/src/components/Forms/AddArtworkForm";
import ScrollButton from "@/src/components/Buttons/ScrollButton";
import AddCollectionButton from "@/src/components/Buttons/AddCollectionButton";
import { Collection } from "@/src/@types";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function UserPrivate() {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [ userLocal, setUserLocal] = useState<any>();
  const [userId, setUserId] = useState('');
  const [ collections, setCollections] = useState<Collection[]>();
  const [ collectionsFullScreen, setCollectionsFullScreen] = useState<Collection[]>();
  const [collectionId, setCollectionId] = useState('');

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
    getUser(id!);
  }
  , []);

  useEffect(() => {
    const id = localStorage.getItem('id');
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
    getcollections(id!);
  }
  , []);

  const handleAddClick = (collectionId: string) => {
    setCollectionId(collectionId);
  }

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
    {userLocal && userId && collections && collectionsFullScreen &&
    <main className="overflow-auto snap-y snap-mandatory h-[85vh]" ref={scrollContainerRef}>
      <AddArtworkForm collectionId={collectionId} userId={userId}/>
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
        <div className="flex flex-col gap-4 items-start w-[90vw] py-2 md:w-[84vw] mx-auto group">
          <AddCollectionButton userId={userId} />
          {collections.length > 0 && <div className="flex items-center"><h3 className="text-xl font-extrabold mr-4">Collection : {collections[0].title}</h3> <RiDeleteBin6Line className="text-xl hidden group-hover:block" /></div>}     
        </div>
        {collections.length > 0 && 
        <>
        <Carousel  handleAddClick={handleAddClick} collectionId={collections[0].id.toString()} collection={collections[0]} page="user" addButton />     
        {collectionsFullScreen && <ScrollButton className="mt-4" direction="down" onClick={scrollToNextViewport} />}
        </> }        
      </section>
      </div>
    
    
    {collectionsFullScreen.map((collection, index) => (
      <section key={index} className="flex flex-col items-center justify-around h-[85vh] snap-start" >
        <ScrollButton direction="up" onClick={scrollToPreviousViewport} />        
          <div>
          <div className="flex items-center flex-start">
            <h3 className="w-[90vw] py-4 md:w-[84vw] text-xl font-extrabold mx-auto flex items-center group mr-4">
              {collection.title}
              <RiDeleteBin6Line className="text-xl hidden group-hover:block" />
            </h3>
          </div>
            <Carousel handleAddClick={handleAddClick} collectionId={collection.id.toString()} collection={collection} page="user" addButton />
          </div>  
        {index < collectionsFullScreen.length - 1 && (<ScrollButton direction="down" onClick={scrollToNextViewport} />)}
      </section>
    ))}
  </main> }  
    </>
           
  );
}