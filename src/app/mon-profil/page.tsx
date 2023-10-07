"use client";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/src/contexts/UserContext";
import axiosInstance from "@/src/utils/axios";
import Carousel from "@/src/components/testCarousel/Carousel";
import UserPrivateInfos from "@/src/components/UserProfilPrivate/UserPrivateInfos";
import UserPublicInfosPrivateProfile from "@/src/components/UserProfilPrivate/UserPublicInfosPrivateProfile";


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

interface UserLocal {
  logged: boolean;
    avatar: string;
    nickname: string;
    token: string;
    situation?: string;
    id: string;
    town: string;
    country: string;
    biography: string;
    like: number;
    liked: number;
    lastname: string;
    firstname: string;
    birthday: string;
    email: string;
}

export default function UserPrivate(): React.JSX.Element {
  const [userLocal, setUserLocal] = useState<UserLocal>();

  
  useEffect(() => {
    const id = localStorage.getItem('id');
    const getUser = (id: string) => {
      axiosInstance.get(`/users/${id}`)
      .then(res => {
        console.log("res.data", res.data);
        setUserLocal(res.data);
      
      }).catch(err => {
        console.log(err);
        throw err;
      })
    }
    getUser(id!.toString());
  }
  , []);
  
  return (
    <>
    {userLocal && 
    <div className="mx-4 md:mx-auto md:w-4/5">
    <div className="flex flex-col md:flex-row mt-4 sm:mt-2 md:mt-10">
      <div className="md:w-1/2 md:pr-4">
        <UserPublicInfosPrivateProfile 
          nickname={userLocal.nickname} 
          town={userLocal.town} 
          country={userLocal.country} 
          biography={userLocal.biography}
          avatar={userLocal.avatar}
          likedCount={userLocal.like} />
      </div>
      <div className="md:w-1/2 md:pl-4"> 
        <UserPrivateInfos 
          lastname={userLocal.lastname} 
          firstname={userLocal.firstname} 
          birthday={userLocal.birthday} 
          email={userLocal.email} />
      </div>
    </div>
    <section className="h-full md:h-2/3 mt-10">
      <div className='relative flex mt-8 mb-4 w-full md:w-2/5'>
        <h3 className="text-xl font-extrabold mx-auto md:ml-20">
          Oeuvres ajoutées aux favoris
        </h3>
      </div>
      <div className='h-160 flex'>
      <Carousel imageList={imageList} page="user" />
      </div>
    </section>
  </div>}
    
    </>
  );
}