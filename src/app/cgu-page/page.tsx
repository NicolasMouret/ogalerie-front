import { IoIosArrowDroprightCircle } from 'react-icons/io';
import Link from 'next/link';

export default function WebsiteRulesPage() {
  return (
    <div
      className="flex flex-col items-center justify-center pt-4 sm:pt-20 md:pt-0 h-[70vh] lg:mt-0 bg-background bg-cover bg-center"
      style={{ backgroundImage: 'url(\'/images/background_image_a_propos.png\')' }}
    >
      <h1 className="pl-4 pr-4 text-center text-xl lg:text-4xl font-bold pb-4 lg:pb-10 mt-20 sm:mt-0">
        Règlement de la plateforme & mentions légales
      </h1>
      <div>
        <ul className="text-justify max-w-lg lg:max-w-5xl mx-4 lg:mx-auto indent-4 lg:indent-8 text-xl">
          <li className="flex p-6 text-3xl">
            <IoIosArrowDroprightCircle />
            {' '}
            <Link href="./cgu-page/general-policy" className="hover:underline hover:text-black-500">Politiques Générales</Link>
          </li>
          <li className="flex p-6 text-3xl">
            <IoIosArrowDroprightCircle />
            <Link href="./cgu-page/submission-policy" className="hover:underline hover:text-black-500">Politiques de Soumission</Link>
          </li>
          <li className="flex p-6 text-3xl">
            <IoIosArrowDroprightCircle />
            <Link href="./cgu-page/community-etiquette" className="hover:underline hover:text-black-500">Étiquette de la Communauté</Link>
          </li>
          <li className="flex p-6 text-3xl">
            <IoIosArrowDroprightCircle />
            <Link href="./cgu-page/privacy-policy" className="hover:underline hover:text-black-500">Politique de Confidentialité</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
