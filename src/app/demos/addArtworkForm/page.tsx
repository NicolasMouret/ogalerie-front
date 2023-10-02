"use client";

import AddArtworkForm from "@/src/components/Forms/AddArtworkForm";
import { UiContext } from "@/src/contexts/UiContext";
import { useState, useContext } from "react";

export default function NewArtworkForm() {

  // State to manage modal display
  const { showModalAddArtwork, setShowModalAddArtwork } = useContext(UiContext);
  const openModal = () => {
    setShowModalAddArtwork(true);
  }

  return (
      <div className="relative h-[85vh]">
         <div className={`fixed inset-0 bg-black ${showModalAddArtwork ? 'opacity-5' : 'opacity-0'} z-40 transition-opacity duration-300`}></div>

          {/*// Add new artwork button to open modal*/}
        <h1 onClick={openModal} className="cursor-pointer hover:font-bold absolute top-0 right-0 p-4 z-50 sm:text-sm md:text-base lg:text-lg">
          Ajouter une nouvelle oeuvre
          </h1>

        <AddArtworkForm />
      </div>
    );
}