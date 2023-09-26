"use client";

import EditArtworkForm from "@/src/components/Forms/EditArtworkForm";
import { useState } from "react";

const TEST_EDIT_ARTWORK = {
  title: "Elephant in the Bush",
  description: "Photographie animalière - Prise en Afrique du Sud, Park Kruger.",
  date: "2021",
  tag: {
    type: "Photo",
    support: "Photo",
    style: "Autre"
  },
  imageUrl: {
    path: "/src/assets/images/IMG_8378.jpg",
    name: "IMG_8378.jpg"
  }
};

export default function EditArtwork() {

  // State to manage modal display
  const [showModal, setShowModal] = useState(false);
  // Function to open the modal
  const openModal = () => setShowModal(true);
  // Function to close the modal
  const closeModal = () => setShowModal(false);
  // State to test the form
  const [artworkData, setArtworkData] = useState(TEST_EDIT_ARTWORK);

  return (
      <div className="relative min-h-screen">
         <div className={`fixed inset-0 bg-black ${showModal ? 'opacity-5' : 'opacity-0'} z-40 transition-opacity duration-300`}></div>

          {/*// Edit artwork button to open modal*/}
        <h1 onClick={openModal} className="cursor-pointer hover:font-bold absolute top-0 right-0 p-4 z-50 sm:text-sm md:text-base lg:text-lg">
          Modifier une oeuvre
          </h1>

        <EditArtworkForm
          showModal={showModal}
          closeModal={closeModal}
          testData={artworkData}
          />
      </div>
    );
}