'use client';

import { IoIosArrowDroprightCircle } from 'react-icons/io';
import Link from 'next/link';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

export default function WebsiteRulesPage() {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ opacity: 1 });
  }, [controls]);

  return (
    <div className="flex flex-col items-center justify-center pt-3 pr-10 pl-10 h-[70vh]">
      <motion.h1
        className="md:text-2xl pb-8 md:pt-5 font-bold text-center"
        initial={{ opacity: 0 }}
        animate={controls}
        transition={{ duration: 1 }}
      >
        Règlement de la plateforme & mentions légales
      </motion.h1>
      <div>
        <ul className="text-xl">
          <motion.li
            className="flex p-6 text-base md:text-xl pb-1 md:pt-10 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <IoIosArrowDroprightCircle />
            {' '}
            <Link href="./cgu-page/general-policy" className="hover:underline hover:text-black-500 pl-2">Politiques Générales</Link>
          </motion.li>
          <motion.li
            className="flex p-6 text-base md:text-xl pb-1 md:pt-10 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
          >
            <IoIosArrowDroprightCircle />
            <Link href="./cgu-page/submission-policy" className="hover:underline hover:text-black-500 pl-2">Politiques de Soumission</Link>
          </motion.li>
          <motion.li
            className="flex p-6 text-base md:text-xl pb-1 md:pt-10 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3 }}
          >
            <IoIosArrowDroprightCircle />
            <Link href="./cgu-page/community-etiquette" className="hover:underline hover:text-black-500 pl-2">Étiquette de la Communauté</Link>
          </motion.li>
          <motion.li
            className="flex p-6 text-base md:text-xl pb-5 md:pt-10 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4 }}
          >
            <IoIosArrowDroprightCircle />
            <Link href="./cgu-page/privacy-policy" className="hover:underline hover:text-black-500 pl-2">Politique de Confidentialité</Link>
          </motion.li>
        </ul>
      </div>
    </div>
  );
}
