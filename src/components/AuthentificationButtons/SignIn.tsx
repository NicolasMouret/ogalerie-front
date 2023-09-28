"use client";

import ConnexionForm from "@/src/components/Forms/ConnexionForm";
import { useState } from "react";

export default function SignIn() {

  // State to manage modal display
  const [showModal, setShowModal] = useState(false);
  // State to store the current logged in user
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Function to open the modal
  const openModal = () => setShowModal(true);
  // Function to close the modal
  const closeModal = () => setShowModal(false);


  return (
      <div className="text-xl font-semibold">
         {/* <div className={` bg-black ${showModal ? 'opacity-5' : 'opacity-0'} z-40 transition-opacity duration-300`}>

         </div> */}
        <button onClick={openModal} className="cursor-pointer hover:font-bold p-4 z-50 sm:text-sm md:text-base lg:text-lg">
          Sign In
        </button>
        <ConnexionForm
          showModal={showModal}
          closeModal={closeModal}
          />
      </div>
    );
}