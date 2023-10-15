'use client';

import { useEffect, useState } from 'react';
import axiosInstance from '@/src/utils/axios';
import Carousel from '@/src/components/testCarousel/Carousel';
import UserPrivateInfos from '@/src/components/UserProfilPrivate/UserPrivateInfos';
import UserPublicInfosPrivateProfile from '@/src/components/UserProfilPrivate/UserPublicInfosPrivateProfile';
import { Artwork, Collection } from '@/src/@types';

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

export default function UserPrivate() {
  const [userLocal, setUserLocal] = useState<UserLocal>();
  const [favoris, setFavoris] = useState<Collection>();

  const getUser = (id: string) => {
    axiosInstance.get(`/users/${id}`)
      .then((res) => {
        console.log('res.data', res.data);
        setUserLocal(res.data);
      }).catch((err) => {
        console.log(err);
        throw err;
      });
  };

  const getcollections = (id: string) => {
    axiosInstance.get<Artwork[]>(`/users/${id}/favorites`)
      .then((res) => {
        console.log('res.data collections', res.data);
        setFavoris({
          id: 1,
          title: 'Favoris',
          artworks: res.data,
        });
      }).catch((err) => {
        console.log(err);
        throw err;
      });
  };

  useEffect(
    () => {
      const id = localStorage.getItem('id');
      if (id) {
        getUser(id);
      }
    },
    [],
  );

  useEffect(
    () => {
      const id = localStorage.getItem('id');
      getcollections(id!.toString());
    },
    [],
  );

  return (
    <>
      {userLocal && favoris
    && (
    <div className="md:mx-auto md:w-4/5">
      <div className="flex flex-col md:flex-row mt-4 sm:mt-2 md:mt-10">
        <div className="mx-2 md:w-1/2 md:pr-4">
          <UserPublicInfosPrivateProfile
            userLocal={userLocal}
            getUser={getUser}
            nickname={userLocal.nickname}
            town={userLocal.town}
            country={userLocal.country}
            biography={userLocal.biography}
            avatar={userLocal.avatar}
            likesReceived={userLocal.liked}
            likesEmitted={userLocal.like}
          />
        </div>
        <div className="mx-2 md:w-1/2 md:pl-4">
          <UserPrivateInfos
            userLocal={userLocal}
            getUser={getUser}
            lastname={userLocal.lastname}
            firstname={userLocal.firstname}
            birthday={userLocal.birthday}
            email={userLocal.email}
          />
        </div>
      </div>
      <section className="sm:flex-grow flex flex-col justify-start pt-4">
        {favoris.artworks.length > 0 ? (
          <h3 className="pl-2 md:pl-0 text-xl font-extrabold sm:mx-auto w-[84vw] text-left py-4">
            Oeuvres ajoutées aux favoris
          </h3>
        )
          : (
            <h3 className="text-xl font-extrabold sm:mx-auto w-[84vw] text-left py-4">
              Vous n'avez pas encore ajouté d'oeuvres à vos favoris
            </h3>
          )}
        {favoris.artworks.length > 0 && <Carousel collectionId={favoris.id.toString()} collection={favoris} page="user" />}
      </section>
    </div>
    )}

    </>
  );
}
