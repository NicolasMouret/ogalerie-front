'use client';

import { notFound } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import axiosInstance from '@/src/utils/axios';
import Carousel from '@/src/components/testCarousel/Carousel';
import UserPublicInfos from '@/src/components/UserProfilPublic/UserPublicInfos';
import { Collection, Artwork } from '@/src/@types';

interface UserPublicProps {
  params: {
    id: string;
  }
}

export default function UserPublic({ params }: UserPublicProps) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [isNotFound, setIsNotFound] = useState<boolean>(false);
  const [userLocal, setUserLocal] = useState<any>();
  const [favoris, setFavoris] = useState<Collection>();

  useEffect(
    () => {
      const getUser = (id: string) => {
        axiosInstance.get(`/users/${id}`)
          .then((res) => {
            setUserLocal(res.data);
          }).catch((err) => {
            if (err.response?.status === 404) {
              setIsNotFound(true);
            }
            console.log(err);
          });
      };
      getUser(params.id);
    },
    [params.id],
  );

  useEffect(
    () => {
      const getcollections = (id: string) => {
        axiosInstance.get<Artwork[]>(`/users/${id}/favorites`)
          .then((res) => {
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
      getcollections(params.id);
    },
    [params.id],
  );

  if (isNotFound) {
    notFound();
  }

  return (
    <>
      {userLocal && favoris
    && (
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
    </main>
    ) }
    </>

  );
}
