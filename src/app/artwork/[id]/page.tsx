'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { FaSearch } from 'react-icons/fa';
import axiosInstance from '@/src/utils/axios';
import ArtworkInfos from '@/src/components/ArtworkInfos/Artwork';
import CommentsBlock from '@/src/components/Comments/Comments';
import { Artwork } from '@/src/@types';
import ModaleZoom from '@/src/components/ModaleZoom/ModaleZoom';

interface ArtworkPageProps {
  params: {
    id: string;
  }
}

export default function ArtworkPage({ params }: ArtworkPageProps) {
  const artworkId = params.id;
  const [isNotFound, setIsNotFound] = useState<boolean>(false);
  const [userId, setUserId] = useState('');
  const [artwork, setArtwork] = useState<Artwork>();
  const [isFaves, setIsFaves] = useState<boolean>();
  const [isLiked, setIsLiked] = useState<boolean>();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  console.log('artwork', artwork);

  const getArtwork = (id: string) => {
    axiosInstance.get(`/artworks/${id}`)
      .then((res) => {
        console.log('res.data', res.data);
        setArtwork(res.data);
        setIsFaves(res.data.favorite_by !== 0);
        setIsLiked(res.data.liked_by !== 0);
        console.log('tags', res.data.tags[0].name);
      })
      .catch((err) => {
        if (err.response?.status === 404) {
          setIsNotFound(true);
        }
        console.log(err);
      });
  };

  useEffect(() => {
    setUserId(localStorage.getItem('id')!);
  }, []);

  useEffect(() => {
    getArtwork(artworkId);
  }, [artworkId]);

  if (isNotFound) {
    notFound();
  }

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  return (
    <>
      {artwork && (
        <div className="flex flex-col md:flex-row md:justify-center items-center gap-5 mx-auto mt-0 md:mt-10 w-[90vw] md:w-[1500px]">
          <div
            className="relative flex items-center w-full h-[300px] sm:w-[50%] sm:h-[400px] md:w-[40%] md:h-[450px] lg:w-[65%] lg:h-[600px] xl:w-[70%] xl:h-[700px] md:pb-0 custom-artwork-image]"
            onClick={() => !isMobile && setModalOpen(true)}
            role="button"
            tabIndex={0}
          >
            <Image
              className="top-0 left-0 w-full h-full object-contain md:max-w-[80%] md:mx-auto lg:max-w-[90%]"
              src={artwork.uri}
              alt="image"
              layout="fill"
            />
            <div className="hidden md:flex absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
              <FaSearch size={48} color="white" />
            </div>
          </div>

          <div className="md:block">
            <ModaleZoom isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
              <div className="relative">
                <Image
                  src={artwork.uri}
                  alt="image"
                  layout="responsive"
                  width={1300}
                  height={1300}
                  className="w-full max-h-[70vh] md:max-h-[90vh] object-contain mx-auto modal-artwork-image"
                />
              </div>
            </ModaleZoom>
          </div>

          <div className="flex flex-col gap-5 md:gap-12 justify-center h-full">
            <ArtworkInfos
              artwork={artwork}
              setArtwork={setArtwork}
              ownerId={artwork.owner_id.toString()}
              setIsFaves={setIsFaves}
              setIsLiked={setIsLiked}
              isFaves={isFaves!}
              isLiked={isLiked!}
              userId={userId}
              artworkId={artworkId}
              title={artwork.title}
              likes={artwork.likes}
              author={artwork.owner}
              date={artwork.date}
              typeTag={artwork.tags[0] === undefined ? '' : `#${artwork.tags[0].name}`}
              support={artwork.tags[1] === undefined ? '' : `#${artwork.tags[1].name}`}
              style={artwork.tags[2] === undefined ? '' : `#${artwork.tags[2].name}`}
              description={artwork.description}
            />
            <CommentsBlock userId={userId} artworkId={artworkId} comments={artwork.comment} />
          </div>
        </div>
      )}
    </>
  );
}
