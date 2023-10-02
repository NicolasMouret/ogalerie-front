"use client";

import { useState } from 'react';

export default function ContactForm() {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formValues, setFormValues] = useState({
    nom: '',
    prenom: '',
    email: '',
    objet: '',
    message: ''
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
        formValues.nom.trim() !== '' &&
        formValues.prenom.trim() !== '' &&
        formValues.email.trim() !== '' &&
        formValues.objet.trim() !== '' &&
        formValues.message.trim() !== ''
      ) {
        setShowSuccessMessage(true);
    
        setFormValues({
         nom: '',
         prenom: '',
         email: '',
         objet: '',
         message: ''
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  return (
    <>
      <div className="w-96 mx-auto mt-8">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-4">
            <input
              type="text"
              name="nom"
              value={formValues.nom}
              onChange={handleChange}
              className="border-2 border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Nom"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="prenom"
              value={formValues.prenom}
              onChange={handleChange}
              className="border-2 border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Prénom"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              className="border-2 border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="objet"
              value={formValues.objet}
              onChange={handleChange}
              className="border-2 border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Objet de votre message"
              required
            />
          </div>
          <div className="mb-4">
            <textarea
              className="border-2 border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
              rows="4"
              placeholder="Rédigez votre message"
              name="message"
              value={formValues.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="block mx-auto font-bold text-gray-800 py-2 px-4 rounded-full border-gray-400 border-2 mt-4 hover:text-white active:text-white hover:bg-gray-400 active:bg-gray-400 active:border-gray-200"
            >
              Envoyer
            </button>
          </div>
          {showSuccessMessage && (
            <div className="bg-green-100 text-green-700 p-4 mt-4 text-center">
              Votre message a été envoyé.
            </div>
          )}
        </form>
      </div>
    </>
  );
}
