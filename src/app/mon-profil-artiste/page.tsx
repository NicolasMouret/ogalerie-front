"use client";
import { useEffect, useRef, useState, useContext } from "react";
import { UiContext } from "@/src/contexts/UiContext";
import { useWindowSize } from "@uidotdev/usehooks";
import axiosInstance from "@/src/utils/axios";
import Carousel from "@/src/components/testCarousel/Carousel";
import UserPrivateInfos from "@/src/components/UserProfilPrivate/UserPrivateInfos";
import UserPublicInfosPrivateProfile from "@/src/components/UserProfilPrivate/UserPublicInfosPrivateProfile";
import AddArtworkForm from "@/src/components/Forms/AddArtworkForm";
import ScrollButton from "@/src/components/Buttons/ScrollButton";
import AddCollectionButton from "@/src/components/Buttons/AddCollectionButton";
import { RiImageAddFill } from "react-icons/ri";
import DeleteModal from "@/src/components/UserProfilPrivate/DeleteModal";
import { Collection } from "@/src/@types";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function UserPrivate() {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const screenWidth = useWindowSize().width;
  const { setShowModalAddArtwork } = useContext(UiContext);
  const [ userLocal, setUserLocal] = useState<any>();
  const [ userId, setUserId] = useState('');
  const [ collections, setCollections] = useState<Collection[]>();
  const [ collectionsFullScreen, setCollectionsFullScreen] = useState<Collection[]>();
  const [ collectionId, setCollectionId] = useState('');
  const [ isModalOpen, setIsModalOpen] = useState(false);
  const [ collectionToDelete, setCollectionToDelete] = useState<string | null>(null);

  const getcollections = (id: string) => {
    axiosInstance.get<Collection[]>(`/users/${id}/collections`)
    .then(res => {
        console.log("res.data collections", res.data);
        setCollections(res.data); 
        setCollectionsFullScreen(res.data.slice(1));                  
    }).catch(err => {
        console.log(err);
        throw err;
    });
  };

  useEffect(() => {
    const id = localStorage.getItem('id');
    if(id) {
      setUserId(id);
      axiosInstance.get(`/users/${id}`)
      .then(response => {
        console.log("response.data", response.data);
        setUserLocal(response.data);
      }).catch(error => {
        console.log(error);
        throw error;
      });
      getcollections(id);
    }
  }, []);

  const handleAddClick = (collectionId: string) => {
    setCollectionId(collectionId);
  }

  const handleMobileAdd = (collectionId: string) => {
    handleAddClick!(collectionId);
    setShowModalAddArtwork(true);
  }

  const handleDeleteCollection = (collectionId: string) => {
    axiosInstance.delete(`/collections/${collectionId}`)
    .then(response => {
      console.log("Collection supprimée avec succès", response.data);
      const id = localStorage.getItem("id")
      getcollections(id!);
    })
    .catch(error => {
      console.error("Erreur lors de la suppression de la collection", error);
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
        <section className="h-screen sm:flex-grow sm:h-[85vh] snap-start">
          <div className="flex flex-col gap-4 items-start w-[90vw] py-2 md:w-[84vw] mx-auto group">
            <AddCollectionButton userId={userId} />
            {collections.length > 0 && 
            <div className="flex items-center">
              <h3 className="flex flex-col gap-2 sm:flex-row text-xl font-extrabold mr-4">{collections[0].title}
              {screenWidth! < 768 && <button onClick={() => handleMobileAdd(collections[0].id.toString())} className="flex gap-1 font-bold text-base"><RiImageAddFill className="text-2xl"  />Ajouter une oeuvre</button>}
              </h3> 
              <RiDeleteBin6Line className="text-xl hidden group-hover:block" /></div>}     
          </div>
          {collections.length > 0 && 
          <>
          <Carousel  handleAddClick={handleAddClick} collectionId={collections[0].id.toString()} collection={collections[0]} page="user" addButton />     
          {collectionsFullScreen.length > 0 && <ScrollButton className="mt-4" direction="down" onClick={scrollToNextViewport} />}
          </> }        
        </section>
      </div>
    
    
    {collectionsFullScreen.map((collection, index) => (
      <section key={index} className="flex flex-col items-center justify-around h-[85vh] snap-start" >
        <ScrollButton direction="up" onClick={scrollToPreviousViewport} />        
          <div>
          <div className="flex flex-col sm:gap-2 sm:flex-row flex-start">
            <h3 className="w-[90vw] py-2 md:w-[84vw] text-xl font-extrabold mx-auto flex items-center group mr-4">
              {collection.title}
              <RiDeleteBin6Line className="text-xl ml-2 md:hidden group-hover:block" onClick={() => handleDeleteClick(collection.id.toString())} />
            </h3>
            {screenWidth! < 768 && <button onClick={() => handleMobileAdd(collection.id.toString())} className="flex gap-1 w-[90vw] mx-auto mb-2 font-bold text-base"><RiImageAddFill className="text-2xl"  />Ajouter une oeuvre</button>}
          </div>
            <Carousel handleAddClick={handleAddClick} collectionId={collection.id.toString()} collection={collection} page="user" addButton />
          </div>  
        {index < collectionsFullScreen.length - 1 && (<ScrollButton direction="down" onClick={scrollToNextViewport} />)}
      </section>
    ))}
      <DeleteModal isOpen={isModalOpen} onClose={handleCancelDelete}>
        <p>Êtes-vous sûr de vouloir supprimer la collection ?</p>
        <div className="flex justify-end space-x-4 mt-6">
          <button className="px-4 py-2 border rounded-md hover:bg-gray-100" onClick={handleCancelDelete}>Annuler</button>
          <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600" onClick={handleConfirmDelete}>Confirmer</button>
        </div>
      </DeleteModal>
  </main> }  
    </>
           
  );
}