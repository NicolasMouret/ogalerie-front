'use client';

import {
  useEffect, useRef, useState, useContext,
} from 'react';
import { useWindowSize } from '@uidotdev/usehooks';
import { RiImageAddFill } from 'react-icons/ri';
import { UiContext } from '@/src/contexts/UiContext';
import axiosInstance from '@/src/utils/axios';
import Carousel from '@/src/components/testCarousel/Carousel';
import UserPrivateInfos from '@/src/components/UserProfilPrivate/UserPrivateInfos';
import UserPublicInfosPrivateProfile from '@/src/components/UserProfilPrivate/UserPublicInfosPrivateProfile';
import AddArtworkForm from '@/src/components/Forms/AddArtworkForm';
import ScrollButton from '@/src/components/Buttons/ScrollButton';
import AddCollectionButton from '@/src/components/Buttons/AddCollectionButton';
import DeleteModal from '@/src/components/UserProfilPrivate/DeleteModal';
import CollectionTitle from '@/src/components/CollectionTitle/CollectionTitle';
import { Collection } from '@/src/@types';

export default function UserPrivate() {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const screenWidth = useWindowSize().width;
  const { setShowModalAddArtwork } = useContext(UiContext);
  const [userLocal, setUserLocal] = useState<any>();
  const [userId, setUserId] = useState('');
  const [collections, setCollections] = useState<Collection[]>();
  const [collectionsFullScreen, setCollectionsFullScreen] = useState<Collection[]>();
  const [collectionId, setCollectionId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [collectionToDelete, setCollectionToDelete] = useState<string | null>(null);

  const getCollections = (id: string) => {
    axiosInstance.get<Collection[]>(`/users/${id}/collections`)
      .then((res) => {
        console.log('res.data collections', res.data);
        setCollections(res.data);
        setCollectionsFullScreen(res.data.slice(1));
      }).catch((err) => {
        console.log(err);
        throw err;
      });
  };

  const getUser = (id: string) => {
    axiosInstance.get(`/users/${id}`)
      .then((response) => {
        console.log('response.data', response.data);
        setUserLocal(response.data);
      }).catch((error) => {
        console.log(error);
        throw error;
      });
  };

  useEffect(() => {
    const id = localStorage.getItem('id');
    if (id) {
      setUserId(id);
      getUser(id);
      getCollections(id);
    }
  }, []);

  const handleAddClick = (collectionId: string) => {
    setCollectionId(collectionId);
  };

  const handleMobileAdd = (collectionId: string) => {
    handleAddClick!(collectionId);
    setShowModalAddArtwork(true);
  };

  const handleDeleteCollection = (collectionId: string) => {
    axiosInstance.delete(`/collections/${collectionId}`)
      .then((response) => {
        console.log('Collection supprimée avec succès', response.data);
        getCollections(userId);
      })
      .catch((error) => {
        console.error('Erreur lors de la suppression de la collection', error);
      });
  };

  const handleDeleteClick = (collectionId: string) => {
    setCollectionToDelete(collectionId);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (collectionToDelete) {
      handleDeleteCollection(collectionToDelete);
      setIsModalOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setCollectionToDelete(null);
    setIsModalOpen(false);
  };

  const scrollToNextViewport = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollTop + window.innerHeight,
        behavior: 'smooth',
      });
    }
  };

  const scrollToPreviousViewport = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollTop - window.innerHeight,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      {userLocal && userId && collections && collectionsFullScreen
    && (
    <main className="overflow-auto snap-y snap-mandatory h-[85vh]" ref={scrollContainerRef}>
      <AddArtworkForm collectionId={collectionId} userId={userId} getCollections={getCollections} />
      <section className="flex flex-col items-center justify-around sm:snap-start sm:min-h-[85vh]">
        <div className="flex flex-col min-h-[85vh] sm:min-h-fit gap-4 md:gap-8 mx-4 md:mx-auto md:w-[85vw] max-w-[1700px] md:flex-row md:py-2 sm:py-4 snap-start sm:snap-align-none">
          <div className="md:w-1/2">
            <UserPublicInfosPrivateProfile
              userLocal={userLocal}
              getUser={getUser}
              nickname={userLocal.nickname}
              town={userLocal.town}
              country={userLocal.country}
              biography={userLocal.biography}
              avatar={userLocal.avatar}
              likesEmitted={userLocal.like}
              likesReceived={userLocal.liked}
            />
          </div>
          <div className="md:w-1/2 snap-start sm:snap-align-none">
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
        <AddCollectionButton userId={userId} reGetCollections={getCollections} />
        <div className="flex flex-col justify-around pb-[5vh] sm:pb-0 min-h-[85vh] sm:min-h-0 sm:gap-2 flex-start snap-start sm:snap-align-none">
          {screenWidth ! < 768 && <ScrollButton direction="up" onClick={scrollToPreviousViewport} />}
          <div className="flex flex-col sm:gap-2 sm:flex-row flex-start">
            <CollectionTitle originalTitle={collections[0].title} id={collections[0].id.toString()} handleDeleteClick={handleDeleteClick} />
            {screenWidth! < 768 && (
            <button type="button" onClick={() => handleMobileAdd(collections[0].id.toString())} className="flex gap-1 w-[90vw] mx-auto mb-2 font-bold text-base">
              <RiImageAddFill className="text-2xl" />
              Ajouter une oeuvre
            </button>
            )}
          </div>
          <Carousel handleAddClick={handleAddClick} collectionId={collections[0].id.toString()} collection={collections[0]} page="user" addButton />
          <ScrollButton className="sm:snap-end" direction="down" onClick={scrollToNextViewport} />
        </div>
      </section>

      {collectionsFullScreen.map((collection, index) => (
        <section key={collection.id} className="flex flex-col items-center justify-around pb-[5vh] sm:pb-0 min-h-[85vh] snap-start">
          <ScrollButton direction="up" onClick={scrollToPreviousViewport} />
          <div>
            <div className="flex flex-col sm:gap-2 sm:flex-row flex-start">
              <CollectionTitle originalTitle={collection.title} id={collection.id.toString()} handleDeleteClick={handleDeleteClick} />
              {screenWidth! < 768 && (
              <button type="button" onClick={() => handleMobileAdd(collection.id.toString())} className="flex gap-1 w-[90vw] mx-auto mb-2 font-bold text-base">
                <RiImageAddFill className="text-2xl" />
                Ajouter une oeuvre
              </button>
)}
            </div>
            <Carousel handleAddClick={handleAddClick} collectionId={collection.id.toString()} collection={collection} page="user" addButton />
          </div>
          {index < collectionsFullScreen.length - 1 && (<ScrollButton direction="down" onClick={scrollToNextViewport} />)}
        </section>
      ))}
      <DeleteModal isOpen={isModalOpen} onClose={handleCancelDelete}>
        <p>Êtes-vous sûr de vouloir supprimer la collection ?</p>
        <div className="flex justify-end space-x-4 mt-6">
          <button type="button" className="px-4 py-2 border rounded-md hover:bg-gray-100" onClick={handleCancelDelete}>Annuler</button>
          <button type="button" className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600" onClick={handleConfirmDelete}>Confirmer</button>
        </div>
      </DeleteModal>
    </main>
    ) }
    </>

  );
}
