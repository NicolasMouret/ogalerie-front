"use client";

import { useContext } from 'react'
import { UiContext } from '@/src/contexts/UiContext'
import React, { FormEvent, useState } from 'react';
import { UserContext } from '@/src/contexts/UserContext';
import axiosInstance from '@/src/utils/axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Image from 'next/image';
import logo from "../../assets/images/logosmall.png";
import CloseButton from '../Buttons/CloseButton';
import { stringify } from 'json5';




export default function ConnexionForm() {
  // State to store user input
  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // State to display error messages
  const [error, setError] = useState<string | null>(null);
  // Toggle password visibility
  const [showPassword, setShowPassword] = useState(false);
  const { showModalSignIn, setShowModalSignIn } = useContext(UiContext);
  const closeModal = () => setShowModalSignIn(false);

  // Handle form submission
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const objData = Object.fromEntries(formData);

    if ( !objData.email || !objData.password ) {
      setError('Veuillez remplir tous les champs.');
      return;
    }

  axiosInstance.post('/login', objData)
    .then(res => {
      console.log(res.data);  
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${res.data.token}` 
      localStorage.setItem('OgToken', res.data.token);
      localStorage.setItem('nickname', res.data.nickname);
      localStorage.setItem('situation', res.data.situation);
      localStorage.setItem('avatar', res.data.avatar);
      localStorage.setItem('id', res.data.id.toString());
      delete res.data.token;  
      setUser({...user, id: res.data.id.toString(), ...res.data,});
      console.log(user);
      closeModal();     
    })
    .catch(err => {
      console.log(objData);
      throw err});
};

  return (
    <>
      {/* Background overlay when modal is open */}
      <div onClick={closeModal} className={`fixed inset-0 bg-black ${showModalSignIn ? 'opacity-40' : 'hidden'} z-40 transition-opacity duration-300`}></div>
      {/* Login form modal */}
      <div className={`fixed inset-0 flex items-center justify-center my-auto h-[70vh] w-[95vw] md:w-[512px] mx-auto z-50 ${showModalSignIn ? '' : 'hidden'}`}>
      <div className="relative bg-gray-200 p-8 sm:p-8 rounded-lg w-full md:w-[512px] mx-auto sm:w-3/4">
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
              height={200}
            />
          </div>
          {/* Login form heading */}
          <h1 className="text-center font-bold text-gray-700 mb-4 text-xl">Connexion</h1>
          {/* Display error messages */}
          {error && <p className="text-sm text-red-500 text-center p-3 mt-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Email"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full p-2 mb-4 rounded"
            />
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Mot de passe"
                value={password}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full p-2 mb-4 rounded pr-10"
              />
              {/* Toggle password visibility */}
              <span 
                className="absolute inset-y-0 right-2 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {/* Forgot password link */}
            <a className="text-sm underline cursor-pointer hover:font-bold">Mot de passe oublié</a>
            {/* Submit button */}
            <button type="submit" className="block mx-auto font-bold py-2 px-4 rounded-full border-gray-700 border-2 mt-8 hover:text-gray-500 active:text-white hover:bg-gray-200 active:bg-gray-400 active:border-gray-200">
              Se connecter
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

