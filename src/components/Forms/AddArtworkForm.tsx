"use client";

import React, { FormEvent, useState } from 'react';
import  AxiosInstance  from '@/src/utils/axios';
import { UiContext } from '@/src/contexts/UiContext';
import Image from 'next/image';
import CloseButton from '../Buttons/CloseButton';
import CloudinaryUpload from '../Buttons/CloudinaryUpload';
import { RxCross2 } from 'react-icons/rx';
import { get } from 'http';

interface AddArtworkFormProps {
  collectionId: string;
  userId: string;
  getCollections: (id: string) => void;
}

export default function AddArtworkForm({collectionId, userId, getCollections}: AddArtworkFormProps) {
  const { showModalAddArtwork, setShowModalAddArtwork } = React.useContext(UiContext);
  // State to display error messages.
  const [error, setError] = useState<string | null>(null);
  // State to store added images
  const [image, setImage] = useState<string | null>();
  // State to store the selected artowork type (tags).
  const [type, setType] = useState("");
   // State to store the selected artwork support (tags).
  const [support, setSupport] = useState("");
   // State to store the selected artwork style (tags).
  const [style, setStyle] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [uploadUrl, setUploadUrl] = useState("");
  console.log(collectionId);

  const closeModal = () => {
    setShowModalAddArtwork(false);
  }
  const imageInputRef = React.useRef<HTMLInputElement>(null);

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setDate("");
    setType("");
    setSupport("");
    setStyle("");
    setImage(null);
    setError(null);
  }

  //get the url of the uploaded image
  const handleOnUpload = (result: any) => {
    console.log(result.info);
    setImage(`${result.info.original_filename}.${result.info.format}`);
    setUploadUrl(result.info.secure_url);  
  }

  // Handle form submission.
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const objData = Object.fromEntries(formData);
    objData.uri = uploadUrl;
    objData.collection_id = collectionId;
    console.log(objData);

    AxiosInstance.post(`/users/${userId}/artworks`, objData)
    .then((res) => {
      console.log(res.data);
      clearForm();
      closeModal();
      getCollections(userId);
    }).catch((err) => {
      console.log(err);
    } )
  }

  return (
    <>
      {/* Background overlay when modal is open */}
      <div onClick={closeModal} className={`fixed inset-0 bg-black ${showModalAddArtwork ? 'opacity-40' : 'hidden'} z-40 transition-opacity duration-300`}></div>
     
      {/* modal */}
      <div className={`fixed inset-0 flex md:w-[512px] md:h-[560px] my-auto mx-auto items-center justify-center z-50 ${showModalAddArtwork ? '' : 'hidden'}`}>
        <div className="relative bg-gray-200 px-4 md:p-8 sm:p-8 rounded-lg h-[660px] md:h-[575px] w-[98vw] md:w-[512px] mx-auto sm:w-3/4">
         
          {/* Close button for modal */}
          <CloseButton
            className="absolute top-4 left-4 text-gray-700 hover:bg-gray-200 active:bg-gray-400 p-1 rounded-full w-10 h-10 flex items-center justify-center"
            onClick={() => {
              clearForm();
              closeModal();  
          }} />

          {/* Platform logo */}
          <div className="flex justify-center mb-4">
            <Image
              alt="Logo of the O'Galerie platform"
              src={'/images/logosmall.png'}
              width={150}
              height={150}
            />
          </div>

          {/* Form heading */}
          <h1 className="text-center font-bold text-gray-700 mb-4 text-base ">Ajouter une nouvelle oeuvre à ma collection</h1>
          
          {/* Display error messages */}
          {error && <p className="text-sm text-red-500 text-center p-3 mt-4">{error}</p>}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Titre de l'oeuvre"
              value={title}
              name="title"
              onChange={(e) => setTitle(e.target.value)}
              className={`block w-full p-2 mb-4 rounded text-sm `}
            />
            <input
              type="text"
              placeholder="Description de l'oeuvre"
              value={description}
              name="description"
              onChange={(e) => setDescription(e.target.value)}
              className={`block w-full p-2 mb-4 rounded pr-10 text-sm `}
            />
            <input
              type="text"
              min="1900"
              max="2099"
              placeholder="Année de création"
              value={date}
              name="date"
              onChange={(e) => setDate(e.target.value)}
              className={`block w-full p-2 mb-4 rounded text-sm `}
            />

            <p className="pt-2 pb-2 text-sm text-gray-700 ">Ajouter les tags associés :</p>
            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-4">
              <select
                name="type"
                value={type}
                className="text-sm text-gray-600 p-2 bg-white rounded"
                onChange={e => setType(e.target.value)}>
                <option value="" disabled>Type</option>
                <option value="peinture">Peinture</option>
                <option value="dessin">Dessin</option>
                <option value="aquarelle">Aquarelle</option>
                <option value="sculpture">Sculpture</option>
                <option value="photographie">Photo</option>
                <option value="autre">Autre</option>
              </select>
             <select
                name="support"
                value={support}
                className="p-2 text-sm text-gray-600 bg-white rounded"
                onChange={e => setSupport(e.target.value)}>
                <option value="" disabled>Support</option>
                <option value="toile">Toile</option>
                <option value="papier">Papier</option>
                <option value="bois">Bois</option>
                <option value="textile">Textile</option>
                <option value="numérique">Numérique</option>
                <option value="autre">Autre</option>
              </select>
              <select
                name="style"
                value={style}
                className="text-sm text-gray-600 p-2 bg-white rounded"
                onChange={e => setStyle(e.target.value)}>
              <option value="" disabled>Style</option>
                <option value="portrait">Portrait</option>
                <option value="figuratif">Figuratif</option>
                <option value="paysage">Paysage</option>
                <option value="abstrait">Abstrait</option>
                <option value="autre">Autre</option>
              </select>
            </div>
           
            <div className="mt-4">
              <div className="flex justify-center py-2">
                <CloudinaryUpload handleOnUpload={handleOnUpload} />
              </div>

              {image && (
                <div className="flex items-center justify-center mt-2">
                  <span className="mr-2 text-sm">{image}</span>

                  <button
                    className="border border-red-500 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white w-4 h-4 rounded-full transition duration-150 ease-in-out text-xs font-normal"
                    onClick={() => {
                      setImage(null);
                      if (imageInputRef.current) {
                        imageInputRef.current.value = "";
                      }
                    }}
                  >
                    <RxCross2 className="mx-auto" />
                  </button>
                </div>
              )}
            </div>
            {/* Submit button */}
              <button
                type="submit"
                className="mt-6 block mx-auto font-bold py-2 px-8 rounded-full text-gray-700 border border-gray-600  hover:text-gray-500 active:text-white hover:bg-gray-200 active:bg-gray-400 active:border-gray-200"
              >
                Ajouter
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
