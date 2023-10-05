"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "@/src/contexts/UserContext";
import axiosInstance from "@/src/utils/axios";
import Carousel from "@/src/components/testCarousel/Carousel";
import UserPrivateInfos from "@/src/components/UserProfilPrivate/UserPrivateInfos";
import UserPublicInfosPrivateProfile from "@/src/components/UserProfilPrivate/UserPublicInfosPrivateProfile";
import AddArtworkForm from "@/src/components/Forms/AddArtworkForm";
import ScrollButton from "@/src/components/Buttons/ScrollButton";


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

const collections = [collection1, collection2, collection3];
const collectionsFullScreen = collections.slice(1);

export default function UserPrivate() {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const { user, setUser } = useContext(UserContext);
  // const [ collections, setCollections] = useState([]);

  const id = localStorage.getItem('id')?.toString();

  useEffect(() => {
    const getUser = (id: string) => {
      axiosInstance.get(`/users/${id}`)
      .then(res => {
        console.log("res.data", res.data);
        setUser(res.data);
      
      }).catch(err => {
        console.log(err);
        throw err;
      })
    }
    // const getcollections = (id: string) => {
    //     axiosInstance.get(`/users/${id}/collections`)
    //     .then(res => {
    //         console.log("res.data collections", res.data);
    //         setCollections(res.data);       
    //     }).catch(err => {
    //         console.log(err);
    //         throw err;
    //     })
    // }
    getUser(id!);
    // getcollections(id!);
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
    <main className="overflow-auto snap-y snap-mandatory h-[85vh]" ref={scrollContainerRef}>
      <AddArtworkForm collectionId="1"/>
      <div className="sm:h-screen snap-start">
      <div className="flex flex-col gap-4 md:gap-8 mx-4 md:mx-auto md:w-4/5 md:flex-row md:py-4 sm:py-4">
        <div className="md:w-1/2">
        <UserPublicInfosPrivateProfile 
          nickname={user.nickname} 
          town={user.town} 
          country={user.country} 
          biography={user.biography}
          avatar={user.avatar}
          likedCount={user.like} />
        </div>
        <div className="md:w-1/2"> 
        <UserPrivateInfos 
          lastname={user.lastname} 
          firstname={user.firstname} 
          birthday={user.birthday} 
          email={user.email} />
        </div>
      </div>
      <section className="sm:flex-grow h-[85vh]  sm:block">
        <h3 className="w-[90vw] py-4 md:w-[84vw] text-xl font-extrabold mx-auto">
        Ma collection
        </h3>      
        <Carousel imageList={collections[0]} page="user" addButton />     
        <ScrollButton direction="down" onClick={scrollToNextViewport} />         
      </section>
      </div>
    
    
    {collectionsFullScreen.map((collection, index) => (
      <section key={index} id={`section-${index}`} className="flex flex-col items-center justify-around h-[85vh] snap-start" >
        <ScrollButton direction="up" onClick={scrollToPreviousViewport} />        
          <div>
            <h3 className="w-[90vw] py-4 md:w-[84vw] text-xl font-extrabold mx-auto">
              Ma collection
            </h3>
            <Carousel imageList={collection} page="user" addButton />
          </div>  
        {index < collectionsFullScreen.length - 1 && (<ScrollButton direction="down" onClick={scrollToNextViewport} />)}
      </section>
    ))}
    </main>   
    </>
           
  );
}