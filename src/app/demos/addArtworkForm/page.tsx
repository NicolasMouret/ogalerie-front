"use client";

import AddArtworkForm from "@/src/components/Forms/AddArtworkForm";
import { useState } from "react";

export default function NewArtworkForm() {

  // State to manage modal display
  const [showModal, setShowModal] = useState(false);
  // Function to open the modal
  const openModal = () => setShowModal(true);
  // Function to close the modal
  const closeModal = () => setShowModal(false);

  return (
      <div className="relative min-h-screen">
         <div className={`fixed inset-0 bg-black ${showModal ? 'opacity-5' : 'opacity-0'} z-40 transition-opacity duration-300`}></div>

          {/*// Add new artwork button to open modal*/}
        <h1 onClick={openModal} className="cursor-pointer hover:font-bold absolute top-0 right-0 p-4 z-50 sm:text-sm md:text-base lg:text-lg">
          Ajouter une nouvelle oeuvre
          </h1>

        <AddArtworkForm
          showModal={showModal}
          closeModal={closeModal}
          />
      </div>
    );
}