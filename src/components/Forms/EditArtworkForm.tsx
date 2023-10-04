"use client";

import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import Image from 'next/image';
import logo from "../../assets/images/logosmall.png";
import CloseButton from '../Buttons/CloseButton';

// Define data structure for tags associated with the artwork.
interface TagData {
  type: string;
  support: string;
  style: string;
}
// Define the shape of form data for type checking.
interface FormData {
  title: string;
  description: string;
  date: string;
  tag: TagData;
  imageUrl: {
    path: string;
    name: string;
};
  };
  // Define props for the EditArtworkForm component.
interface EditArtworkFormProps {
  testData: FormData;
  showModal: boolean;
  closeModal: () => void;
}

const EditArtworkForm: React.FC<EditArtworkFormProps> = ({ testData, showModal, closeModal }) => {
  // State to manage and store the form data.
  const [formData, setFormData] = useState<FormData>(testData);
  
  useEffect(() => {
    setFormData(testData);
  }, [testData]);

  // State to display error messages.
  const [error, setError] = useState<string | null>(null);

  // State to manage image data and display
  const [image, setImage] = useState(testData.imageUrl.path);
  const [imageName, setImageName] = useState(testData.imageUrl.name);

  useEffect(() => {
    // setImage(testData.imageUrl);
  }, [testData.imageUrl]);

  // States to manage the chosen artwork tags.
  const [type, setType] = useState(testData.tag.type);
  const [support, setSupport] = useState(testData.tag.support);
  const [style, setStyle] = useState(testData.tag.style);

  useEffect(() => {
    setType(testData.tag.type);
    setSupport(testData.tag.support);
    setStyle(testData.tag.style);
  }, [testData]);

  // Ref for image input to clear it if needed.
  const imageInputRef = React.useRef<HTMLInputElement>(null);

  // Handle changes in input fields and update.
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
    console.log("Données du formulaire modifiées:", formData, "Image:", image, "Type:", type, "Support:", support, "Style:", style);

   // Validation
    if (!formData.title || !formData.description || !formData.date || !image) {
     setError("Merci de ne pas laisser de champ vide !");
     return 
    } 
    if (!type || !support || !style) {
      setError("Merci de choisir 3 tags");
      return;
    }

    closeModal();

    // Test - simulated response.
    setTimeout(() => {
      alert("Oeuvre modifiée avec succès !");
      setError(null);
      closeModal();
    }, 1000); 
  }
   // Remove image.
  const removeImage = () => {
    // setImage(null);
    setImageName("");
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  }

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
            onClick={() => {;
              setError(null);
              closeModal();  
          }} />

          {/* Logo */}
          <div className="flex justify-center mb-1 md:flex">
            <Image
              alt="Logo of the O'Galerie platform"
              src={logo}
              width={150}
              height={150}
            />
          </div>

          {/* Form title */}
          <h1 className="text-center font-bold text-gray-700 mb-4 text-base ">Modifier une oeuvre</h1>
          
          {/* Display error message */}
          {error && <p className="text-sm text-red-500 text-center p-3 mt-4">{error}</p>}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Modifier le titre de l'oeuvre"
              value={formData.title || ""}
              name="title"
              onChange={handleChange}
              className={`block w-full p-2 mb-4 rounded text-sm ${!formData.title && error ? 'border-red-500' : ''}`}
            />
            <input
              type="text"
              placeholder="Modifier la description de l'oeuvre"
              value={formData.description || ""}
              name="description"
              onChange={handleChange}
              className={`block w-full p-2 mb-4 rounded pr-10 text-sm ${!formData.description && error ? 'border-red-500' : ''}`}
            />
            <input
              type="number"
              min="1900"
              max="2099"
              placeholder="Modifier l'année de création"
              value={formData.date || ""}
              name="date"
              onChange={handleChange}
              className={`block w-full p-2 mb-4 rounded text-sm ${!formData.title && error ? 'border-red-500' : ''}`}
            />

            <p className="pt-2 pb-2 text-sm text-gray-700 ">Tags associés :</p>
            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-4">
              <select
                name="type"
                value={type}
                className="w-full text-sm text-gray-600 p-2 bg-white rounded"
                onChange={e => setType(e.target.value)}>
                <option value="" disabled>Type</option>
                <option value="Peinture">Peinture</option>
                <option value="Dessin">Dessin</option>
                <option value="Aquarelle">Aquarelle</option>
                <option value="Sculpture">Sculpture</option>
                <option value="Photo">Photo</option>
                <option value="Autre">Autre</option>
              </select>
             <select
                name="support"
                value={support}
                className="p-2 text-sm text-gray-600 bg-white rounded"
                onChange={e => setSupport(e.target.value)}>
                <option value="" disabled>Support</option>
                <option value="Toile">Toile</option>
                <option value="Papier">Papier</option>
                <option value="Bois">Bois</option>
                <option value="Textile">Textile</option>
                <option value="Photo">Photo</option>
                <option value="Autre">Autre</option>
              </select>
              <select
                name="style"
                value={style}
                className="w-full text-sm text-gray-600 p-2 bg-white rounded"
                onChange={e => setStyle(e.target.value)}>
              <option value="" disabled>Style</option>
                <option value="Portrait">Portrait</option>
                <option value="Figuratif">Figuratif</option>
                <option value="Paysage">Paysage</option>
                <option value="Abstrait">Abstrait</option>
                <option value="Autre">Autre</option>
              </select>
            </div>
           
            <div className="mt-4">
              <div className="relative">
                <button className="py-2 px-4 mt-2 border-2 text-m font-medium text-gray-700 border-gray-300 rounded  ">
                 Remplacer l'image
                </button>

                <input
                  type="file"
                  ref={imageInputRef}
                  name="image"
                  id="image"
                  accept="image/*"
                 className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={e => {
                    if (e.target.files && e.target.files.length > 0) {
                      // setImage(e.target.files[0]);
                      setImageName(e.target.files[0].name);
                    }
                  }}
                />
              </div>

              {image && (
                <div className="flex items-center mt-2">
                  <span className="ml-2 text-sm">Image actuelle: {imageName}</span>
                  <button
                    className="border border-red-500 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white flex items-center justify-center w-4 h-4 rounded-full ml-2 transition duration-150 ease-in-out text-xs font-normal"
                    onClick={removeImage}
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
                Modifier
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
export default EditArtworkForm;