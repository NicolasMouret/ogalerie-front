/* eslint-disable no-unused-vars */

'use client';

import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BsHeartFill, BsHeart } from 'react-icons/bs';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { UiContext } from '@/src/contexts/UiContext';
import axiosInstance from '@/src/utils/axios';
import LikeButton from '@/src/components/Buttons/LikeButton';
import FaveButton from '@/src/components/Buttons/FaveButton';
import ModifyButton from '../Buttons/ModifyButton';
import EditArtworkForm from '../Forms/EditArtworkForm';
import DeleteModal from '../UserProfilPrivate/DeleteModal';
import { Artwork } from '@/src/@types';

interface ArtworkInfosProps {
  likes: number;
  title: string;
  author: string;
  date: string;
  typeTag?: string;
  support?: string;
  style?: string;
  description: string;
  userId: string;
  artworkId: string;
  isFaves: boolean;
  setIsFaves: (isFaves: boolean) => void;
  isLiked: boolean;
  setIsLiked: (isLiked: boolean) => void;
  ownerId: string;
  artwork: Artwork;
  setArtwork: (artwork: Artwork) => void;
}

export default function ArtworkInfos({
  likes,
  title,
  author,
  date,
  typeTag,
  support,
  style,
  description,
  userId,
  artworkId,
  isFaves,
  setIsFaves,
  isLiked,
  ownerId,
  setIsLiked,
  artwork,
  setArtwork,
}: ArtworkInfosProps) {
  const [likesTotal, setLikesTotal] = useState<number>(likes);
  const { setShowModalEditArtwork } = useContext(UiContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const router = useRouter();

  const setDate = (date: string) => {
    const isoDate = new Date(date);
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = isoDate.toLocaleDateString('fr-FR', options);
    return formattedDate;
  };

  const showEdit = () => {
    setShowModalEditArtwork(true);
  };

  const deleteArtwork = () => {
    axiosInstance.delete(`artworks/${artworkId}`)
      .then(() => {
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const requestDeleteArtwork = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    deleteArtwork();
    setShowDeleteModal(false);
    router.back();
  };

  return (
    <div className="flex flex-col justify-center gap-2 overflow-hidden pb-2 h-fit w-[95vw] md:w-[800px]">
      <div className="flex flex-col md:flex-row items-center">
        <h1 className="text-2xl sm:text-4xl md:text-4xl mb-4 md:mb-0 md:mr-6">
          "
          {title}
          "
        </h1>
        {likesTotal === 0 && (
        <span>
          <BsHeart className="inline text-2xl mr-1" />
          {' '}
          {likesTotal}
          {' '}
          like
        </span>
        )}
        {likesTotal === 1 && (
        <span>
          <BsHeartFill className="inline text-2xl mr-1" />
          {' '}
          {likesTotal}
          {' '}
          like
        </span>
        )}
        {likesTotal > 1 && (
        <span>
          <BsHeartFill className="inline text-2xl mr-1" />
          {' '}
          {likesTotal}
          {' '}
          likes
        </span>
        )}
      </div>
      <p className="text-center sm:text-left md:pl-4">
        Par
        {' '}
        <span className="underline font-bold"><Link href={`${ownerId === userId ? '/mon-profil-artiste' : `/artist/${ownerId}`}`}>{author}</Link></span>
      </p>
      <div className="flex flex-col sm:flex-row text-sm md:text-base gap-1 pl-4 mt-4">
        <p>
          {setDate(date)}
        </p>
        <p className="hidden md:inline-block"> - </p>
        <div className="flex flex-row gap-1">
          <p>{typeTag}</p>
          <p>{support}</p>
          <p>{style}</p>
        </div>
      </div>
      {/* <p className="pl-4 underline">Voir la collection</p> */}
      <p className="text-sm md:text-base pl-4 pr-4 mb-4 md:mb-0 mt-4">{description}</p>
      <div className="flex items-center text-sm h-8 pl-4 pr-4 mt-1 md:mt-4 gap-6">
        {userId && (
        <LikeButton
          userId={userId}
          artworkId={artworkId}
          isLiked={isLiked}
          setIsLiked={setIsLiked}
          setLikesTotal={setLikesTotal}
        />
        )}
        {userId && localStorage.getItem('situation') !== 'creator' && (
        <FaveButton
          userId={userId}
          artworkId={artworkId}
          isFaves={isFaves}
          setIsFaves={setIsFaves}
        />
        )}
        <EditArtworkForm
          prevTitle={title}
          prevDate={date}
          prevDescription={description}
          artworkId={artworkId}
          artwork={artwork}
          setArtwork={setArtwork}
        />
        {userId === ownerId && (
        <>
          <button type="button" onClick={showEdit} className="flex items-center pl-2">
            <ModifyButton />
            Modifier l'oeuvre
          </button>
          <button type="button" onClick={requestDeleteArtwork} className="flex items-center">
            <RiDeleteBin6Line className="mr-1" size="20" />
            Supprimer l'oeuvre
          </button>
        </>
        )}
        {/* <SignalButton size="md" sizeIcon="3xl"/> */}
      </div>
      <DeleteModal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <h2>Confirmer la suppression</h2>
        <p>Êtes-vous sûr de vouloir supprimer cette œuvre ?</p>
        <div className="flex justify-end gap-4">
          <button type="button" onClick={() => setShowDeleteModal(false)} className="bg-gray-300 px-4 py-2 rounded">Annuler</button>
          <button type="button" onClick={confirmDelete} className="bg-red-600 text-white px-4 py-2 rounded">Supprimer</button>
        </div>
      </DeleteModal>
    </div>
  );
}

ArtworkInfos.defaultProps = {
  style: '',
  support: '',
  typeTag: '',
};
