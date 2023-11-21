/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-static-element-interactions */

'use client';

import React, {
  FormEvent, useState, useEffect, useContext,
} from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Image from 'next/image';
import { RxCross2 } from 'react-icons/rx';
import Link from 'next/link';
import { UiContext } from '@/src/contexts/UiContext';
import { UserContext } from '@/src/contexts/UserContext';
import axiosInstance from '@/src/utils/axios';
import CloseButton from '../Buttons/CloseButton';
import CloudinaryUpload from '../Buttons/CloudinaryUpload';

export default function AuthentificationForm() {
  const { user, setUser } = useContext(UserContext);
  const [image, setImage] = useState<string | null>(null);
  const imageInputRef = React.useRef<HTMLInputElement>(null);
  const { showModalSignUp, setShowModalSignUp } = useContext(UiContext);
  const [nickname, setNickname] = useState('');
  const [firstname, setfirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [birthdate, setbirthdate] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [uploadUrl, setUploadUrl] = useState('');

  const closeModal = () => {
    setShowModalSignUp(false);
    console.log('closeModal');
  };

  // State to display error messages
  const [error, setError] = useState<string | null>(null);
  // Toggle password visibility
  const [showPassword, setShowPassword] = useState(false);
  // State to store if cgu checked
  const [acceptedTOS, setAcceptedTOS] = useState(false);

  useEffect(() => {
    if (showModalSignUp) {
      // To reinitialize modal and errors.
      setError(null);
    }
  }, [showModalSignUp]);

  const handleOnUpload = (result: any) => {
    console.log(result.info);
    setImage(`${result.info.original_filename}.${result.info.format}`);
    setUploadUrl(result.info.secure_url);
  };

  // Handle form submission
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const objData = Object.fromEntries(formData);

    if (uploadUrl) {
      objData.avatar = uploadUrl;
    }
    console.log('Données du formulaire saisies:', objData);

    // Validation checks

    if (!objData.nickname
      || !objData.lastname
      || !objData.firstname
      || !objData.birthday
      || !objData.town
      || !objData.country
      || !objData.email
      || !objData.password) {
      setError('Merci de saisir tous les champs');
      return;
    }

    if (objData.password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères.');
      return;
    }

    if (objData.password !== objData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }
    delete objData.confirmPassword;

    if (!acceptedTOS) {
      setError("Merci d'accepter les conditions d'utilisation");
      return;
    }
    delete objData.accept_cgu;
    if (!objData.situation) {
      setError("Merci de choisir un type de profil (artiste / amateur d'art)");
      return;
    }

    // To prevent user under 18 years old to subscrire to the platform
    const dateValue = objData.birthday instanceof File ? objData.birthday.name : objData.birthday;
    const birthDate = new Date(dateValue);
    const currentDate = new Date();
    const ageLimit = new Date(currentDate);
    ageLimit.setFullYear(currentDate.getFullYear() - 18);

    if (birthDate > ageLimit) {
      setError("L'âge minimum requis pour s'inscire est de 18 ans.");
      return;
    }
    delete objData.image;
    axiosInstance.post('/users', objData)
      .then((res) => {
        console.log(res.data);
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${res.data.token}`;
        localStorage.setItem('OgToken', res.data.token);
        localStorage.setItem('nickname', res.data.nickname);
        localStorage.setItem('situation', res.data.situation);
        localStorage.setItem('avatar', res.data.avatar);
        localStorage.setItem('id', res.data.id.toString());
        delete res.data.token;
        setUser(({ ...user, ...res.data }));
        closeModal();
      })
      .catch((err) => {
        if (err.response.data.error === 'Pseudo déjà utilisé') {
          setError(err.response.data.error);
        } else {
          setAcceptedTOS(false);
          closeModal();
        }
      });
  };

  return (
    <>
      {/* Background overlay when modal is open */}
      <div onClick={closeModal} onKeyDown={closeModal} className={`fixed inset-0 bg-black ${showModalSignUp ? 'opacity-40' : 'hidden'} z-40 transition-opacity duration-300`} />
      {/* Sign up form modal */}
      <div className={`fixed inset-0 flex items-center justify-center w-[95vw] md:w-[600px] mx-auto z-50 ${showModalSignUp ? '' : 'hidden'}`}>
        <div className="relative bg-gray-200 px-2 sm:p-6 rounded-lg h-[98vh] md:h-[90vh] max-h-[725px] w-full md:w-[600px] mx-auto sm:w-3/4">
          {/* Close button for modal */}
          <CloseButton
            className="absolute top-4 left-4 text-gray-700 hover:bg-gray-200 active:bg-gray-400 p-1 rounded-full w-10 h-10 flex items-center justify-center"
            onClick={() => {
              setError(null);
              closeModal();
            }}
          />
          {/* Platform logo */}
          <div className="flex justify-center pt-2 md:pt-0 md:mb-1">
            <Image
              alt="Logo of the O'Galerie platform"
              src="/images/logosmall.png"
              width={170}
              height={170}
            />
          </div>

          {/* Display error messages */}
          {error && <p className="text-sm text-red-500 text-center md:p-2 mt-2 md:mt-0 ">{error}</p>}

          <form className="w-full text-sm" onSubmit={handleSubmit}>
            <div className="pl-8 pt-5 md:pt-0">
              <div className="pb-2 md:py-3 mx-auto max-w-xl flex flex-col mb-2">
                <div className="flex items-center mb-2">
                  <input
                    type="radio"
                    name="situation"
                    id="artist"
                    value="creator"
                  />
                  <label htmlFor="artist" className="ml-2">
                    <p className="font-bold inline-block">Je suis artiste</p>
                    <span> : je souhaite partager mes créations.</span>
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="radio"
                    name="situation"
                    id="user"
                    value="user"
                  />
                  <label htmlFor="user" className="ml-2">
                    <p className="font-bold inline-block">Je suis amateur d&apos;art</p>
                    <span> : je souhaite rejoindre la communauté.</span>
                  </label>
                </div>
              </div>
              <div className="grid grid-cols-2 max-w-md mx-auto md:py-3">
                <input
                  type="text"
                  placeholder="Pseudo"
                  value={nickname}
                  name="nickname"
                  className="bg-gray-200 placeholder-gray-500 border-b-2 border-black pl-1 pb-1 w-4/5 outline-none"
                  onChange={(e) => setNickname(e.target.value)}
                />
                <div className="relative">
                  {!image && <CloudinaryUpload avatar handleOnUpload={handleOnUpload} />}
                  {image && (
                    <div className="flex items-center absolute inset-0 mt-2">
                      <span className="mr-2 text-sm">{image}</span>

                      <button
                        type="button"
                        className="border border-red-500 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white flex items-center justify-center w-4 h-4 rounded-full transition duration-150 ease-in-out text-xs font-normal"
                        onClick={() => {
                          setImage(null);
                          if (imageInputRef.current) {
                            imageInputRef.current.value = '';
                          }
                        }}
                      >
                        <RxCross2 className="mx-auto" />
                      </button>
                    </div>
                  )}
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
                  name="birthday"
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
                  name="town"
                  className="bg-gray-200 placeholder-gray-500 border-b-2 border-black pl-1 pb-1 w-4/5 outline-none"
                  onChange={(e) => setCity(e.target.value)}
                />
                <input
                  type="text"
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
                  className="bg-gray-200 placeholder-gray-500 border-b-2 border-black pl-1 pb-1 w-full outline-none" // changed from w-4/5 to w-full
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

              <div className="flex md:py-4 pr-4 md:pr-20">
                <input
                  type="checkbox"
                  name="accept_cgu"
                  id="accept_cgu"
                  className="mx-2 md:mx-6"
                  checked={acceptedTOS}
                  onChange={(e) => setAcceptedTOS(e.target.checked)}
                />
                <p className="text-gray-600 text-sm">
                  En soumettant ce formulaire,
                  j'accepte les conditions d'utilisation de la plateforme.
                  <Link href="/cgu-page" className="pl-2 font-medium underline cursor-pointer hover:text-black">
                    Voir le règlement
                  </Link>
                </p>
              </div>
            </div>

            <div className="pt-3">
              <button type="submit" className="block mx-auto font-bold py-2 px-4 rounded-full border-gray-700 border-2 mt-2 md:mt-4 hover:text-gray-500 active:text-white hover:bg-gray-200 active:bg-gray-400 active:border-gray-200">
                Créer mon compte
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
