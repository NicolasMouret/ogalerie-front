'use client';

import { useState, useRef, FormEvent } from 'react';
import emailjs from 'emailjs-com';

export default function ContactForm() {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formValues, setFormValues] = useState({
    nom: '',
    prenom: '',
    email: '',
    objet: '',
    message: '',
  });

  const form = useRef(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      formValues.nom.trim() !== ''
      && formValues.prenom.trim() !== ''
      && formValues.email.trim() !== ''
      && formValues.objet.trim() !== ''
      && formValues.message.trim() !== ''
    ) {
      emailjs.sendForm('service_76yu40d', 'template_734vc6t', form.current!, 'td88Kkrc5HnlA8Ud1')
        .then(() => {
          setShowSuccessMessage(true);
          setFormValues({
            nom: '',
            prenom: '',
            email: '',
            objet: '',
            message: '',
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  return (
    <div className="w-96 mx-auto mt-8">
      <form className="w-full" ref={form} onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            name="nom"
            value={formValues.nom}
            onChange={handleChange}
            className="text-sm md:text-base border-2 border-gray-400 rounded-lg w-80 h-10 ml-6 md:ml-0 md:w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
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
            className="text-sm md:text-base border-2 border-gray-400 rounded-lg w-80 h-10 ml-6 md:ml-0 md:w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
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
            className="text-sm md:text-base border-2 border-gray-400 rounded-lg w-80 h-10 md:w-full ml-6 md:ml-0 py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
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
            className="text-sm md:text-base border-2 border-gray-400 rounded-lg w-80 h-10 md:w-full ml-6 md:ml-0 py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            placeholder="Objet de votre message"
            required
          />
        </div>
        <div className="mb-4">
          <textarea
            className="text-sm md:text-base border-2 border-gray-400 rounded-lg w-80 ml-6 md:ml-0 md:w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            rows={4}
            placeholder="Rédigez votre message"
            name="message"
            value={formValues.message}
            onChange={handleChange}
            required
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            value="Send"
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
  );
}
