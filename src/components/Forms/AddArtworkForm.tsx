"use client";

import React, { ChangeEvent, FormEvent, useState } from 'react';
import Image from 'next/image';
import logo from "../../assets/images/logosmall.png";
import CloseButton from '../Buttons/CloseButton';

// Define the shape of form data for type checking.
interface FormData {
  title?: string;
  description?: string;
  date?: string;
  tag?: string;
  showModal: boolean;
  closeModal: () => void;
}

const AddArtworkForm: React.FC<FormData> = ({ showModal, closeModal }) => {
  // State to store user input.
  const [formData, setFormData] = useState<FormData>({});
  // State to display error messages.
  const [error, setError] = useState<string | null>(null);
  // State to store added images
  const [image, setImage] = useState<File | null>(null);
  // State to store the selected artowork type (tags).
  const [type, setType] = useState("");
   // State to store the selected artwork support (tags).
  const [support, setSupport] = useState("");
   // State to store the selected artwork style (tags).
  const [style, setStyle] = useState("");

  const imageInputRef = React.useRef<HTMLInputElement>(null);

  // Handle changes in input fields.
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission.
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Données du formulaire ajoutées:", formData, "Image:", image, "Type:", type, "Support:", support, "Style:", style);

   // Validation checks
    if (!formData.title || !formData.description || !formData.date || !image) {
     setError("Merci de saisir tous les champs");
     return 
    } 
    if (!type || !support || !style) {
      setError("Merci de choisir 3 tags");
      return;
    }

    clearForm();
    closeModal();

    // Test - simulated responses
    setTimeout(() => {
      alert("Oeuvre ajoutée à votre collection avec succès !");
      clearForm();
      closeModal();
    }, 1000); 
  }
   
   // Clear or close the form after submission
   const clearForm = () => {
    setFormData({
      title: "",
      description: "",
      date: "",
      tag: ""
    });
    setType("");
    setSupport("");
    setStyle("");
    setImage(null);
    setError(null);
  };

  return (
    <>
      {/* Background overlay when modal is open */}
      <div className={`fixed inset-0 bg-gray ${showModal ? 'opacity-30' : 'opacity-0'} z-40 transition-opacity duration-300`}></div>
     
      {/* modal */}
      <div className={`fixed inset-0 flex items-center justify-center z-50 ${showModal ? '' : 'hidden'}`}>
        <div className="relative bg-gray-200 p-8 sm:p-8 rounded-lg w-full md:w-[512px] mx-auto sm:w-3/4">
         
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
              src={logo}
              width={150}
              height={'auto'}
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
              value={formData.title || ""}
              name="title"
              onChange={handleChange}
              className={`block w-full p-2 mb-4 rounded text-sm ${!formData.title && error ? 'border-red-500' : ''}`}
            />
            <input
              type="text"
              placeholder="Description de l'oeuvre"
              value={formData.description || ""}
              name="description"
              onChange={handleChange}
              className={`block w-full p-2 mb-4 rounded pr-10 text-sm ${!formData.description && error ? 'border-red-500' : ''}`}
            />
            <input
              type="number"
              min="1900"
              max="2099"
              placeholder="Année de création"
              value={formData.date || ""}
              name="date"
              onChange={handleChange}
              className={`block w-full p-2 mb-4 rounded text-sm ${!formData.title && error ? 'border-red-500' : ''}`}
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
                <option value="photo">Photo</option>
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
              <div className="relative">
                <button className="py-2 px-4 mt-2 border-2 text-m font-medium text-gray-700 border-gray-300 rounded  ">
                 Charger une image
                </button>

                <input
                  type="file"
                  ref={imageInputRef}
                  name="image"
                  id="image"
                  accept="image/*"
                 className="absolute inset-0 w-[181px] h-[44px] translate-y-2 opacity-0 cursor-pointer"
                  onChange={e => {
                    if (e.target.files && e.target.files.length > 0) setImage(e.target.files[0]);
                  }}
                />
              </div>

              {image && (
                <div className="flex items-center mt-2">
                  <span className="mr-2 text-sm">{image.name}</span>

                  <button
                    className="border border-red-500 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white flex items-center justify-center w-4 h-4 rounded-full transition duration-150 ease-in-out text-xs font-normal"
                    onClick={() => {
                      setImage(null);
                      if (imageInputRef.current) {
                        imageInputRef.current.value = "";
                      }
                    }}
                  >
                    x
                  </button>
                </div>
              )}
            </div>
            {/* Submit button */}
              <button
                type="submit"
                className="mb-2 block mx-auto font-bold py-2 px-4 rounded-full text-gray-700 border border-gray-600 mt-8 hover:text-gray-500 active:text-white hover:bg-gray-200 active:bg-gray-400 active:border-gray-200"
              >
                Ajouter
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
export default AddArtworkForm;