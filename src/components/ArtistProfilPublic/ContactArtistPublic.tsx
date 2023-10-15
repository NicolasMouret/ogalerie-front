'use client';

import { useState, useRef, FormEvent } from 'react';
import emailjs from 'emailjs-com';
import { BsSend } from 'react-icons/bs';

export default function ContactArtistPublic() {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formValues, setFormValues] = useState({
    nom: '',
    email: '',
    message: '',
  });

  const form = useRef(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      formValues.nom.trim() !== ''
      && formValues.email.trim() !== ''
      && formValues.message.trim() !== ''
    ) {
      emailjs.sendForm('service_76yu40d', 'template_734vc6t', form.current!, 'td88Kkrc5HnlA8Ud1')
        .then(() => {
          setShowSuccessMessage(true);
          setFormValues({
            nom: '',
            email: '',
            message: '',
          });
        })
        .catch((error) => {
          console.error(error);
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
    <>
      <div className="w-11/12 md:w-96 mx-auto mt-2">
        <p className="font-bold text-lg mb-2">Contactez-moi !</p>
        <div className="flex">
          <form className="w-full" ref={form} onSubmit={handleSubmit}>
            <div className="mb-3">
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
            <div className="mb-3">
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
            <div>
              <textarea
                className="border-2 border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                rows={4}
                placeholder="Rédigez votre message"
                name="message"
                value={formValues.message}
                onChange={handleChange}
                required
              />
            </div>
            {showSuccessMessage && (
            <div className="bg-green-100 text-green-700 p-2 mt-1 text-center">
              Votre message a été envoyé.
            </div>
            )}
            <div className="flex justify-end mt-3">
              <button
                type="submit"
                className="focus:outline-none text-gray-700 ml-2 mr-2 mb-2"
              >
                <BsSend size={30} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
