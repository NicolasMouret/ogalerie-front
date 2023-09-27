"use client";

import React, { ChangeEvent, FormEvent, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Image from 'next/image';
import logo from "../../assets/images/logosmall.png";
import CloseButton from '../Buttons/CloseButton';

// Define the shape of form data for type checking
interface FormData {
  email?: string;
  password?: string;
  showModal: boolean;
  closeModal: () => void;
  successfulLogin: (user: typeof TEST_USER) => void;
}

// // Test user for mock authentication
// const TEST_USER = {
//   pseudo: "AliénorB",
//   email: "alienor@exemple.com",
//   password: "1234"
// };

function login(formData) {
  return fetch('http://localhost:3003/v1/login', {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(formData),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
})
.then(res => {
  if (!res.ok) {
    return res.text().then(text => {
      console.error('Error response:', text); 
      console.log(JSON.stringify(formData))
      throw new Error('Failed to fetch data');
    });
  }
  console.log(JSON.stringify(res));
  return res.json();
});
}

const ConnexionForm: React.FC<FormData> = ({ showModal, closeModal, successfulLogin }) => {
  // State to store user input
  const [formData, setFormData] = useState<FormData>({});
  // State to display error messages
  const [error, setError] = useState<string | null>(null);
  // Toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

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

    login(formData)
    .then(TEST_USER => {
      console.log(TEST_USER);
      if (formData.email === TEST_USER.email && formData.password === TEST_USER.password) {
        successfulLogin(TEST_USER.firstname);
        setError(null);
        closeModal();
      } else {
        setError("Email or password is incorrect");
      }

      // Clear the form after submission
      setFormData({
        email: "",
        password: ""
      });
    })
    .catch(error => {
      console.error(error);
      setError("Failed to authenticate");
    });
};

  return (
    <>
      {/* Background overlay when modal is open */}
      <div className={`fixed inset-0 bg-gray ${showModal ? 'opacity-30' : 'opacity-0'} z-40 transition-opacity duration-300`}></div>
      {/* Login form modal */}
      <div className={`fixed inset-0 flex items-center justify-center z-50 ${showModal ? '' : 'hidden'}`}>
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
              height={'auto'}
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
              value={formData.email || ""}
              name="email"
              onChange={handleChange}
              className="block w-full p-2 mb-4 rounded"
            />
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Mot de passe"
                value={formData.password || ""}
                name="password"
                onChange={handleChange}
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
            <button type="submit" className="block mx-auto font-bold py-2 px-4 rounded-full border border-gray-700 border-2 mt-8 hover:text-gray-500 active:text-white hover:bg-gray-200 active:bg-gray-400 active:border-gray-200">
              Se connecter
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ConnexionForm;