"use client"

import logo from "../../assets/images/logosmall.png"
import Image from "next/image";
import CloseButton from "../Buttons/CloseButton";


const AuthentificationForm = () => {



  
    return (
<section className="fixed inset-0 flex items-center justify-center z-50">
  <div className="bg-black opacity-30 fixed inset-0"></div>
  <div className="relative bg-gray-200 p-8 sm:p-8 rounded-lg w-full md:w-[700px] flex flex-col items-center">
  <CloseButton
            className="absolute top-4 left-4 text-gray-700 hover:bg-gray-200 active:bg-gray-400 p-1 rounded-full w-10 h-10 flex items-center justify-center"
            onClick={() => {
              setError(null);
              closeModal();  
            }}
          />
    <div className="mb-4 items-center ">
      <Image
        alt="Logo of the O'Galerie platform"
        src={logo}
        className="w-1/2 flex mx-auto"
      />
    </div>
    <form className="w-full">
          <div className="py-1.5 mx-auto max-w-xl flex">
            <input type="radio" name="role_choice" id="artist" /><p className="font-bold">Je suis artiste</p> : je souhaite partager mes créations.
          </div>
          <div className="py-1.5 mx-auto max-w-xl flex">
            <input type="radio" name="role_choice" id="user" /><p className="font-bold">Je suis amateur d'art</p> : je souhaite rejoindre la communauté.
          </div>
          <div className="grid grid-cols-2 max-w-md mx-auto py-3.5 ">
          <input type="text" placeholder="Nom" className="bg-gray-200 placeholder-gray-500 border-b-2 border-black pb-4 w-4/5"/>
          <input type="text" placeholder="Prénom" className="bg-gray-200 placeholder-gray-500 border-b-2 border-black pb-4 w-4/5"/>
          </div>
          <div className="grid grid-cols-2 max-w-md mx-auto py-1.5">
          <p className="text-gray-500">Date de naissance</p>
          <input type="text" placeholder="JJ/MM/AAAA" id="birthdate" className="bg-gray-200 placeholder-gray-500 border-b-2 border-black pb-4 w-4/5"/>
          </div>
          <div className="grid grid-cols-2 max-w-md mx-auto py-1.5">
          <input type="text" placeholder="Ville" className="bg-gray-200 placeholder-gray-500 border-b-2 border-black pb-4 w-4/5"/>
          <input type="text" placeholder="Pays" className="bg-gray-200 placeholder-gray-500 border-b-2 border-black pb-4 w-4/5"/>
          </div>
          <div className="max-w-xs mx-auto py-1.5 border-black pb-4 border-b-2 flex justify-start">
              <input type="text" placeholder="Email" className="bg-gray-200 placeholder-gray-500 py-1.5"/>
          </div>
          <div className="grid grid-cols-2 max-w-md mx-auto py-6 border-black pb-4">
              <input type="text" placeholder="Mot de passe" className="bg-gray-200 placeholder-gray-500 border-b-2 border-black pb-4 w-4/5"/>
              <input type="text" placeholder="Confirmer mot de passe" className="bg-gray-200 placeholder-gray-500 border-b-2 border-black pb-4 w-4/5"/>
          </div>
          <div className="flex py-5">
          <input type="checkbox" name="role_choice" id="user" className="mx-6"/>
          <p className="text-gray-600">En soumettant ce formulaire, j'accepte les conditions d'utilisation de la plateforme. Voir le réglement.</p> 
          </div>
          <div>
              <input type="submit" value="Créer mon compte" className="border border-black rounded-full px-4 py-2 mx-auto max-w-xl flex font-bold border-b-4"/>
          </div>
        </form>
        </div>
      </section>
    );
  };
  
  export default AuthentificationForm;
  