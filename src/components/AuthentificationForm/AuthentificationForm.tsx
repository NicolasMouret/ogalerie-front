"use client"

import React, { ChangeEvent, FormEvent, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import logo from "../../assets/images/logosmall.png";
import Image from "next/image";
import CloseButton from "../Buttons/CloseButton";

// Define the shape of form data for type checking
interface FormData {
  lastname?: string;
  firstname?: string;
  date?: string;
  city?: string;
  country?: string;
  email?: string;
  password?: string;
}

interface AuthFormProps {
  showModal: boolean;
  closeModal: () => void;
  successfulLogin: (user: { firstname: string }) => void;
}

const AuthentificationForm: React.FC<AuthFormProps> = ({ showModal, closeModal }) => {
  // State to store user input
  const [formData, setFormData] = useState<FormData>({});
  // State to display error messages
  const [error, setError] = useState<string | null>(null);
  // Toggle password visibility
  const [showPassword, setShowPassword] = useState(false);
  // State to store if cgu checked 
  const [acceptedTOS, setAcceptedTOS] = useState(false);

  // Handle change events from input fields
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Données du formulaire saisies:", formData);

    // Validation checks
    if (!formData.lastname || !formData.firstname || !formData.date || !formData.city || !formData.country || !formData.email || !formData.password) {
      setError("Merci de saisir tous les champs");
      return;
    }
    if (!acceptedTOS) {
      setError("Merci d'accepter les conditions d'utilisation");
      return;
    }

    const birthDate = new Date(formData.date);
    const currentDate = new Date();
    const ageLimit = new Date(currentDate);
    ageLimit.setFullYear(currentDate.getFullYear() - 18);

    if (birthDate > ageLimit) {
      setError("Vous devez avoir au minimum 18 ans pour devenir membre");
      return;
    }
   
    // Clear the form after submission
    setFormData({})
    closeModal();

    // Test - simulated responses
    setTimeout(() => {
      alert("Inscription réussie !");
      successfulLogin({ firstname: formData.firstname! });
    }, 1000);
  };

  // Form reinitialisation after reopening
  const openModal = () => {
    setFormData({});  // 
    setShowModal(true);
    setError(null);
  };

    return (
      <>
      {/* Background overlay when modal is open */}
      <div className={`fixed inset-0 bg-gray ${showModal ? 'opacity-30' : 'opacity-0'} z-40 transition-opacity duration-300`}></div>
      {/* Sign up form modal */}
      <div className={`fixed inset-0 flex items-center justify-center z-50 ${showModal ? '' : 'hidden'}`}>
      <div className="relative bg-gray-200 p-8 sm:p-8 rounded-lg w-full md:w-[750px] mx-auto sm:w-3/4">
          {/* Close button for modal */}
          <CloseButton
            className="absolute top-4 left-4 text-gray-700 hover:bg-gray-200 active:bg-gray-400 p-1 rounded-full w-10 h-10 flex items-center justify-center"
            onClick={() => {
              setError(null);
              closeModal();  
            }}
          />
          {/* Platform logo */}
          <div className="flex justify-center mb-4">
            <Image
              alt="Logo of the O'Galerie platform"
              src={logo}
              width={200}
              height={'auto'}
            />
          </div>

          {/* Display error messages*/}
          {error && <p className="text-sm text-red-500 text-center p-3 mt-4">{error}</p>}

        <form className="w-full" onSubmit={handleSubmit}>
          <div className="py-3 mx-auto max-w-xl flex flex-col">
            <div className="flex items-center mb-3"> 
              <input
              type="radio"
              name="role_choice"
              id="artist"
              onChange={handleChange}
              />
              <label htmlFor="artist" className="ml-2">
              <p className="font-bold inline-block">Je suis artiste</p>
              <span> : je souhaite partager mes créations.</span>
              </label>
            </div>

            <div className="flex items-center">
              <input 
              type="radio" 
              name="role_choice" 
              id="user"
              onChange={handleChange}
              />
              <label htmlFor="user" className="ml-2">
              <p className="font-bold inline-block">Je suis amateur d'art</p>
              <span>: je souhaite rejoindre la communauté.</span>
              </label>
            </div>
          </div>

            <div className="grid grid-cols-2 max-w-md mx-auto py-4">
              <input
              type="text"
              placeholder="Nom"
              name="lastname"
              className="bg-gray-200 placeholder-gray-500 border-b-2 border-black pl-2 pb-1 w-4/5"
              onChange={handleChange}
              />
              <input
              type="text"
              placeholder="Prénom"
              name="firstname"
              className="bg-gray-200 placeholder-gray-500 border-b-2 border-black pl-2 pb-1 w-4/5"
              onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-2 max-w-md mx-auto py-4">
              <p className="text-gray-500">Date de naissance</p>
              <input
              type="date"
              name="date"
              id="birthdate"
              className="bg-gray-200 text-gray-500 border-b-2 border-black pl-2 pb-1 w-4/5"
              onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-2 max-w-md mx-auto py-4">
              <input
              type="text"
              placeholder="Ville"
              name="city"
              className="bg-gray-200 placeholder-gray-500 border-b-2 border-black pl-2 pb-1 w-4/5"
              onChange={handleChange}
              />
              <input type="text"
              placeholder="Pays"
              name="country"
              className="bg-gray-200 placeholder-gray-500 border-b-2 border-black pl-2 pb-1 w-4/5"
              onChange={handleChange}
              />
            </div>

            <div className="max-w-md mx-auto py-4">
              <input type="text"
              placeholder="Email"
              name="email"
              className="bg-gray-200 placeholder-gray-500 border-b-2 border-black pl-2 pb-1"
              onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-2 max-w-md mx-auto py-6 border-black pb-4">
            <div className="relative">
              <input 
                type={showPassword ? 'text' : 'password'}
                value={formData.password || ""}
                placeholder="Mot de passe"
                name="password"
                onChange={handleChange}
                className="bg-gray-200 placeholder-gray-500 border-b-2 border-black pl-2 pb-1 w-4/5"
              />
              <span 
                className="mr-4 absolute inset-y-0 right-2 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <div className="relative">
              <input 
                type={showPassword ? 'text' : 'password'}
                value={formData.password || ""}
                placeholder="Confirmer mdp"
                name="password"
                onChange={handleChange}
                className="bg-gray-200 placeholder-gray-500 border-b-2 border-black pl-2 pb-1 w-4/5"
              />
              <span 
                className="mr-4 absolute inset-y-0 right-2 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            </div>

            <div className="flex py-4">
              <input
              type="checkbox" 
              name="role_choice"
              id="user"
              className="mx-6"
              onChange={(e) => setAcceptedTOS(e.target.checked)}
              />
              <p className="text-gray-600">En soumettant ce formulaire, j'accepte les conditions d'utilisation de la plateforme. Voir le réglement.</p> 
            </div>

            <div className="pt-3">
              <input
              type="submit"
              value="Créer mon compte"
              className="border border-black rounded-full px-4 py-2 mx-auto max-w-xl flex font-bold border-b-4"
              />
            </div>
          </form>
        </div>
      </div>
    </>
    );
  };
  
  export default AuthentificationForm;
  