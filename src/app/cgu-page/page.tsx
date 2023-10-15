import { IoIosArrowDroprightCircle } from 'react-icons/io';
import Link from 'next/link';

export default function WebsiteRulesPage() {
  return (
    <div
      className="flex flex-col items-center justify-center h-[70vh] border-black border-t-4 border-4"
    >
      <h1 className="text-center font-bold pb-4 mt-2 lg:mt-20 text-lg sm:text-2xl md:text-3xl xl:text-4xl">
        Règlement de la plateforme & mentions légales
      </h1>
      <div>
        <ul className="text-xl">
          <li className="flex p-6 text-md sm:text-xl md:text-2xl xl:text-3xl">
            <IoIosArrowDroprightCircle />
            {' '}
            <Link href="./cgu-page/general-policy" className="hover:underline hover:text-black-500">Politiques Générales</Link>
          </li>
          <li className="flex p-6 text-md sm:text-xl md:text-2xl xl:text-3xl">
            <IoIosArrowDroprightCircle />
            <Link href="./cgu-page/submission-policy" className="hover:underline hover:text-black-500">Politiques de Soumission</Link>
          </li>
          <li className="flex p-6 text-md sm:text-xl md:text-2xl xl:text-3xl">
            <IoIosArrowDroprightCircle />
            <Link href="./cgu-page/community-etiquette" className="hover:underline hover:text-black-500">Étiquette de la Communauté</Link>
          </li>
          <li className="flex p-6 text-md sm:text-xl md:text-2xl xl:text-3xl">
            <IoIosArrowDroprightCircle />
            <Link href="./cgu-page/privacy-policy" className="hover:underline hover:text-black-500">Politique de Confidentialité</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
