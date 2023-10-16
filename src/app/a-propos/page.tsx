'use client';

import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FaPalette } from 'react-icons/fa';

export default function InformationPage() {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ opacity: 1 });
  }, [controls]);

  return (
    <div className="flex flex-col mt-12 h-[70vh] p-6 justify-center items-center">
      <motion.div
        className="information-container"
        initial={{ opacity: 0 }}
        animate={controls}
        transition={{ duration: 1 }}
      >
        <h1 className="md:text-2xl pb-5 md:pt-10 font-bold text-center">À propos...</h1>
        <motion.p
          className="slide-down-paragraph text-justify max-w-3xl text-sm md:text-base lg:text-lg xl:text-xl my-6 xl:leading-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          O’Galerie est une plateforme en ligne 100% gratuite, dédiée aux artistes visuels, permettant d’offrir à tous, professionnels ou amateurs, un espace pour exposer et partager leurs œuvres.
        </motion.p>
        <motion.p
          className="slide-down-paragraph text-justify max-w-3xl text-sm md:text-base lg:text-lg xl:text-xl my-6 xl:leading-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
        >
          Cette galerie virtuelle permet aux artistes de se créer un profil personnalisé, de télécharger des images de leurs créations, de les catégoriser selon divers styles, thèmes et médiums.
        </motion.p>
        <motion.p
          className="slide-down-paragraph text-justify max-w-3xl text-sm md:text-base lg:text-lg xl:text-xl my-4 xl:leading-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3 }}
        >
          Les visiteurs peuvent parcourir la galerie, filtrer les œuvres par artiste, tags, style et support, laisser des commentaires, ajouter des favoris et contacter les artistes pour des demandes d'informations, d'éventuels achats ou collaborations.
        </motion.p>

        <motion.span
          className="pt-5 md:pt-8 block text-center text-sm md:text-base lg:text-lg xl:text-xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4 }}
        >
          Bonne visite !
          <FaPalette className="text-4xl mt-4 mx-auto text-primary" />
        </motion.span>
      </motion.div>
    </div>
  );
}
