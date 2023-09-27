"use client"

import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import logo from "../../assets/images/logosmall.png";
import Image from "next/image";
import CloseButton from "../Buttons/CloseButton";

interface AuthentificationFormProps {
  showModal: boolean;
  closeModal: () => void;
}

export default function AuthentificationForm({ showModal, closeModal }: AuthentificationFormProps) {

  const [firstname, setfirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [birthdate, setbirthdate] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // State to display error messages
  const [error, setError] = useState<string | null>(null);
  // Toggle password visibility
  const [showPassword, setShowPassword] = useState(false);
  // State to store if cgu checked 
  const [acceptedTOS, setAcceptedTOS] = useState(false);

  useEffect(() => {
    if (showModal) {
        // To reinitialize modal and errors.
        setError(null);
    }
}, [showModal]);

  // Handle form submission
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const objData = Object.fromEntries(formData);
    console.log("Données du formulaire saisies:", objData);

    // Validation checks
    if (objData.password !== objData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    if (!objData.lastname || !objData.firstname || !objData.date || !objData.city || !objData.country || !objData.email || !objData.password) {
      setError("Merci de saisir tous les champs");
      return;
    }
    if (!acceptedTOS) {
      setError("Merci d'accepter les conditions d'utilisation");
      return;
    }
    if (!objData.role_choice) {
      setError("Merci de choisir un type de profil (artiste / amateur d'art)");
      return;
    }
  
    // To prevent user under 18 years old to subscrire to the platform
    const dateValue = objData.date instanceof File ? objData.date.name : objData.date;
    const birthDate = new Date(dateValue);
    const currentDate = new Date();
    const ageLimit = new Date(currentDate);
    ageLimit.setFullYear(currentDate.getFullYear() - 18);

    if (birthDate > ageLimit) {
      setError("L'âge minimum requis pour s'inscire est de 18 ans.");
      return;
    }
    // Reset acceptedTOS       
    setAcceptedTOS(false);     
    // Modal closing.
    closeModal();

  };

    return (
      <>
      {/* Background overlay when modal is open */}
      <div className={`fixed inset-0 bg-gray ${showModal ? 'opacity-30' : 'opacity-0'} z-40 transition-opacity duration-300`}></div>
      {/* Sign up form modal */}
      <div className={`fixed inset-0 flex items-center justify-center z-50 ${showModal ? '' : 'hidden'}`}>
      <div className="relative bg-gray-200 p-8 sm:p-8 rounded-lg w-full md:w-[600px] mx-auto sm:w-3/4">
          {/* Close button for modal */}
          <CloseButton
            className="absolute top-4 left-4 text-gray-700 hover:bg-gray-200 active:bg-gray-400 p-1 rounded-full w-10 h-10 flex items-center justify-center"
            onClick={() => {
              setError(null);
              closeModal();  
            }}
          />
          {/* Platform logo */}
          <div className="flex justify-center mb-1">
            <Image
              alt="Logo of the O'Galerie platform"
              src={logo}
              width={150}
              height={75}
            />
          </div>

          {/* Display error messages*/}
          {error && <p className="text-sm text-red-500 text-center p-3 mt-4">{error}</p>}

        <form className="w-full text-sm" onSubmit={handleSubmit}>
          <div className="pl-8">
            <div className="pl-7 py-3 mx-auto max-w-xl flex flex-col mb-2">
              <div className="flex items-center mb-2"> 
                <input
                type="radio"
                name="role_choice"
                id="artist"
                value="artist"
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
                value="user"
                />
                <label htmlFor="user" className="ml-2">
                <p className="font-bold inline-block">Je suis amateur d'art</p>
                <span> : je souhaite rejoindre la communauté.</span>
                </label>
              </div>
            </div>

              <div className="grid grid-cols-2 max-w-md mx-auto py-3">
                <input
                type="text"
                placeholder="Nom"
                value={lastname}
                name="lastname"
                className="bg-gray-200 placeholder-gray-500 border-b-2 border-black pl-1 pb-1 w-4/5 outline-none"
                onChange={(e) => setLastname(e.target.value)}
                />
                <input
                type="text"
                placeholder="Prénom"
                value={firstname}
                name="firstname"
                className="bg-gray-200 placeholder-gray-500 border-b-2 border-black pl-1 pb-1 w-4/5 outline-none"
                onChange={(e) => setfirstname(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 max-w-md mx-auto py-3">
                <p className="text-gray-500 text-right pr-10">Date de naissance :</p>
                <input
                type="date"
                value={birthdate}
                name="date"
                id="birthdate"
                className="bg-gray-200 text-gray-500 border-b-2 border-black pl-1 pb-1 w-4/5 outline-none"
                onChange={(e) => setbirthdate(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 max-w-md mx-auto py-3">
                <input
                type="text"
                placeholder="Ville"
                value={city}
                name="city"
                className="bg-gray-200 placeholder-gray-500 border-b-2 border-black pl-1 pb-1 w-4/5 outline-none"
                onChange={(e) => setCity(e.target.value)}
                />
                <input type="text"
                placeholder="Pays"
                value={country}
                name="country"
                className="bg-gray-200 placeholder-gray-500 border-b-2 border-black pl-1 pb-1 w-4/5 outline-none"
                onChange={(e) => setCountry(e.target.value)}
                />
              </div>

              <div className="max-w-md mx-auto py-3 pr-11">
                <input 
                  type="text"
                  placeholder="Email"
                  value={email}
                  name="email"
                  className="bg-gray-200 placeholder-gray-500 border-b-2 border-black pl-1 pb-1 w-full outline-none"  // changed from w-4/5 to w-full
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 max-w-md mx-auto py-3 border-black pb-4">
              <div className="relative">
                <input 
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Mot de passe"
                  value={password}
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-200 placeholder-gray-500 border-b-2 border-black pl-1 pb-1 w-4/5 outline-none"
                />
                <span 
                  className="mr-4 mb-3 absolute inset-y-0 right-2 flex items-center cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <div className="relative pb-3">
                <input 
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  placeholder="Confirmer mdp"
                  name="confirmPassword"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-gray-200 placeholder-gray-500 border-b-2 border-black pl-1 pb-1 w-4/5 outline-none"
                />
                <span 
                  className="mr-4 mb-3 absolute inset-y-0 right-2 flex items-center cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              </div>

              <div className="flex py-4 pr-20">
                <input
                type="checkbox" 
                name="accept_cgu"
                id="user"
                className="mx-6"
                checked={acceptedTOS}
                onChange={(e) => setAcceptedTOS(e.target.checked)}
                />
                <p className="text-gray-600 text-sm">
                  En soumettant ce formulaire, j'accepte les conditions d'utilisation de la plateforme. 
                  <a href="#" className="pl-2 font-medium underline cursor-pointer hover:text-black">
                    Voir le règlement
                  </a>
                </p>  
              </div>
            </div>

            <div className="pt-3">
              <input
              type="submit"
              value="Créer mon compte"
              className="border border-black rounded-full px-4 py-2 mx-auto max-w-xl flex font-bold border-b-4  hover:text-gray-500 active:text-white hover:bg-gray-200 active:bg-gray-400 active:border-gray-200"
              />
            </div>
        </form>
      </div>
    </div>
  </>
  );
};
  

  