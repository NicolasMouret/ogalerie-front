'use client';

import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

// Composant réutilisable pour chaque section avec animation
function SectionAvecAnimation({
  imageSrc, altText, dataRole, citation, delay,
}: {
  imageSrc: string;
  altText: string;
  dataRole: string;
  citation: string;
  delay: number;
}) {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
  }, [controls]);

  return (
    <motion.section
      className="flex flex-col md:flex-row mb-5"
      initial={{ opacity: 0, y: -20 }}
      animate={controls}
      transition={{ duration: 0.5, delay }}
    >
      <div className="flex items-center mb-3 md:mb-0 md:mr-5">
        <Image src={imageSrc} alt={altText} width={150} height={200} className="rounded-md mx-auto md:mx-0" />
      </div>
      <div className="flex items-center">
        <div>
          <h3 className="text-base md:text-lg font-bold mb-2 md:mb-4">{altText}</h3>
          <p className="text-xs md:text-sm">
            <strong>Rôle</strong>
            {' '}
            :
            {' '}
            {dataRole}
          </p>
          <p className="text-xs md:text-sm">
            <strong>Citation</strong>
            {' '}
            :
            {' '}
            <em>
              "
              {citation}
              "
            </em>
          </p>
        </div>
      </div>
    </motion.section>
  );
}

export default function Equipe() {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ opacity: 1 });
  }, [controls]);

  return (
    <>
      <div className="max-w-[980px] mx-auto p-5 mb-8">
        <div className="flex flex-col items-center justify-center mt-5 mb-10">
          <motion.h1
            className="text-xl md:text-2xl lg:text-3xl font-bold pt-5 mt-2 items-center"
            initial={{ opacity: 0, y: -20 }}
            animate={controls}
            transition={{ duration: 0.5 }}
          >
            L'équipe O'GALERIE
          </motion.h1>
        </div>
        <div className="max-w-7xl text-lg m-auto">
          <div className="border-4 border-black p-5 md:p-10 rounded-md">
            <SectionAvecAnimation
              imageSrc="/alienorcadre.jpg"
              altText="Alienor"
              dataRole="Product Owner"
              citation="Je dois vous quitter des Yamakasis frappent à la fenêtre du toit ...."
              delay={0.2}
            />
            <SectionAvecAnimation
              imageSrc="/arnaudp.jpg"
              altText="Arnaud"
              dataRole="Lead Developer Backend"
              citation="Comment ça c'est pas clair, promis je mets à jour la doc ..."
              delay={0.4}
            />
            <SectionAvecAnimation
              imageSrc="/thumbnail_jeromecadre.jpg"
              altText="Jérôme"
              dataRole="Git Master"
              citation="Alors non, on ne code pas sur la branche dev directement..."
              delay={0.6}
            />
            <SectionAvecAnimation
              imageSrc="/nicocadre.jpg"
              altText="Nicolas"
              dataRole="Lead Developer Frontend"
              citation="Nan mais vraiment les C majuscules ...."
              delay={0.8}
            />
            <SectionAvecAnimation
              imageSrc="/sostellcadre.jpg"
              altText="Sostell"
              dataRole="Scrum Master"
              citation="Bon si on récapitule, nous en sommes où là ? ...."
              delay={1.0}
            />
          </div>
        </div>
      </div>
    </>
  );
}
