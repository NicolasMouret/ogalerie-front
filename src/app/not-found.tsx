'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="flex items-start md:items-center justify-center mt-40 md:mt-60">
      <div className="text-center">
        <motion.h2
          className="text-3xl md:text-6xl font-extrabold text-gray-800 mb-2"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          404
        </motion.h2>
        <p className="text-md md:text-xl text-gray-600 mb-10">Oops, cette page est introuvable...</p>
        <Link
          href="/"
          className="px-6 py-2 bg-gray-700 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:bg-blue-700 transition duration-300"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}
