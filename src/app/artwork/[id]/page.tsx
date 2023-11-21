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
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log('artwork test', artwork);

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

  return (
    <>
      {artwork && (
        <div className="flex flex-col md:flex-row sm:justify-center items-center gap-5 mx-auto mt-0 w-[90vw] md:w-[100vw]">
          <div
            className="relative flex items-center w-full h-[300px] sm:w-[40%] sm:h-[400px] md:h-[450px] lg:h-[600px] xl:h-[700px] custom-artwork-image]"
            onClick={() => setIsModalOpen(true)}
            role="button"
            tabIndex={0}
          >
            <Image
              className="w-full h-full object-contain sm:max-w-[90%] sm:max-h-[90%] sm:mx-auto sm:my-auto "
              src={artwork.uri}
              alt="image"
              layout="fill"
            />
            <div className="md:flex absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
              <FaSearch size={48} color="white" />
            </div>
          </div>

          <div className="md:block">
            <ModaleZoom isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
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
