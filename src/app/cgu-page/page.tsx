import { IoIosArrowDroprightCircle } from 'react-icons/io';
import Link from "next/link";

export default function WebsiteRulesPage() {
  return (
    <div className="flex flex-col items-center justify-center pt-4 sm:pt-20 md:pt-0 h-[70vh] lg:mt-0 border-t-4 border-b-4  border-black">
      
      <h1 className="text-center font-bold pb-10 text-2xl sm:text-3xl md:text-4xl">
    Règlement de la plateforme & mentions légales
</h1>
<div>
    <ul className="indent-4">
        <li className="flex p-4 sm:p-5 md:p-6 text-xl sm:text-2xl md:text-3xl">
            <IoIosArrowDroprightCircle />
            <Link href="./cgu-page/general-policy" className='hover:underline hover:text-black-500'>Politiques Générales</Link>
        </li>
        <li className="flex p-4 sm:p-5 md:p-6 text-xl sm:text-2xl md:text-3xl">
            <IoIosArrowDroprightCircle />
            <Link href="./cgu-page/submission-policy" className='hover:underline hover:text-black-500'>Politiques de Soumission</Link>
        </li>
        <li className="flex p-4 sm:p-5 md:p-6 text-xl sm:text-2xl md:text-3xl">
            <IoIosArrowDroprightCircle />
            <Link href="./cgu-page/community-etiquette" className='hover:underline hover:text-black-500'>Étiquette de la Communauté</Link>
        </li>
        <li className="flex p-4 sm:p-5 md:p-6 text-xl sm:text-2xl md:text-3xl">
            <IoIosArrowDroprightCircle />
            <Link href="./cgu-page/privacy-policy" className='hover:underline hover:text-black-500'>Politique de Confidentialité</Link>
        </li>
    </ul>
</div>
    </div>
  );
}






