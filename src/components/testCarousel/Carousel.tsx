"use client";
import { useEffect, useState, useContext } from "react";
//Hook pour récupérer la taille de l'écran, 
import { useWindowSize } from "@uidotdev/usehooks";
import { UiContext } from "@/src/contexts/UiContext";
import CarouselMobile from "../../components/testCarousel/CarouselMobile";
import CarouselDesktop from "../../components/testCarousel/CarouselDesktop";

interface ImageProps {
    id: string;
    url: string;
}

interface CarouselProps {
    imageList: ImageProps[];
    page: string;
    addButton?: boolean;
}

//Ce sera le composant Carousel à utiliser dans les pages
//dans ce composant on on check juste si l'on est sur mobile ou desktop
//pour afficher le carousel correspondant
//Prop page = "home" pour les 4 images ou "user" pour les 3 images
//Prop addButton = true pour afficher le bouton d'ajout d'oeuvre
export default function Carousel({imageList, page, addButton}: CarouselProps) {
  //useWindowSize().width renvoie la largeur de l'écran (en px)
  const screenWidth = useWindowSize().width || 800;
  const [isMobile, setIsMobile] = useState(false);

  const { showModalAddArtwork, setShowModalAddArtwork } = useContext(UiContext);

  const handleClick = () => {
    setShowModalAddArtwork(true);
  }

  //useEffect pour mettre à jour le state isMobile
  //en fonction de la largeur de l'écran
  useEffect(() => {
    if (screenWidth < 768) {
        setIsMobile(true);
    }
    if (screenWidth >= 768) {
        setIsMobile(false);
    }
  }, [screenWidth])

  return (
    <>
      {isMobile ? <CarouselMobile imageList={imageList} addButton={addButton} onClick={handleClick} /> :
       <CarouselDesktop imageList={imageList} page={page} addButton={addButton} onClick={handleClick}/>}
    </>
  )
}