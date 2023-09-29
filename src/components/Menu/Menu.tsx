/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

'use client';
import { useContext, useState } from 'react';
import Link from 'next/link';
import CloseButton from '@/src/components/Buttons/CloseButton';
import { FaUserAlt } from 'react-icons/fa';
import { UiContext } from '@/src/contexts/UiContext';
import { UserContext } from '@/src/contexts/UserContext';

/* eslint-disable react/self-closing-comp */
export default function Menu() {
  const { user, setUser } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const { showModalSignIn, setShowModalSignIn } = useContext(UiContext);
  const { showModalSignUp, setShowModalSignUp } = useContext(UiContext);
  const handleDeconnect = () => {
    setUser({logged: false});
  }
  const handleSignIn = () => {
    setShowModalSignIn(true);
    console.log(showModalSignIn);
  }
  const handleSignup = () => {
    setShowModalSignUp(true);
    console.log(showModalSignUp);
  }
  const handleClick = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
    console.log(user)
  };
  return (
    <div className="flex items-center justify-between py-8">
      <nav>
        <section className="MOBILE-MENU flex sm:hidden">
          <button className="HAMBURGER-ICON space-y-1.5" onClick={handleClick}>
            <span className="block rounded-full h-1 w-8 animate-pulse bg-black"></span>
            <span className="block rounded-full h-1 w-8 animate-pulse bg-black"></span>
            <span className="block rounded-full h-1 w-8 animate-pulse bg-black"></span>
          </button>

          <div className={`${isOpen ? 'showMenuNav' : 'hideMenuNav'} h-[75vh]`}>           
            <CloseButton className="absolute top-0 right-0 px-8 py-8 " onClick={handleClick}/>           
            <ul className="flex flex-col items-center justify-between">
              <li className="underline underline-offset-8 my-6 uppercase">
                <Link onClick={handleClick} className="text-2xl font-semibold" href="/">
                  Accueil
                </Link>
              </li>
              <li className="underline underline-offset-8 my-6 uppercase">
                <Link onClick={handleClick} className="text-lg font-semibold" href="/#">
                  Annuaire des artistes
                </Link>
              </li>
              <li className="underline underline-offset-8 my-6 uppercase">
                <Link onClick={handleClick} className="text-lg font-semibold" href="/#">
                  à propos
                </Link>
              </li>
              <li className="underline underline-offset-8 my-6 uppercase">
                <Link onClick={handleClick} className="text-lg font-semibold" href="/#">
                  Contact
                </Link>
              </li>
              <li className="underline underline-offset-8 my-6 uppercase">
                <Link onClick={handleClick} className="text-lg font-semibold" href="/#">
                  Règlement & mentions légales
                </Link>
              </li>
              <li className="underline underline-offset-8 my-6 uppercase">
                <Link onClick={handleClick} className="text-lg font-semibold" href="/demos">
                  Demos
                </Link>
              </li>
            </ul>
          </div>
        </section>

        <section className="DESKTOP-MENU hidden  space-x-2 lg:flex ">         
          <div className="md:flex mr-16">
          <div className={`flex items-center justify-around mr-14 gap-4 text-lg`}>
            {user.logged ? 
            <>
              <FaUserAlt /><span className="font-bold">Utilisateur :</span><p className="text-xl">{user.nickname}</p><span className="mx-4">-</span>
              <button className="font-semibold text-xl" onClick={handleDeconnect}>Se deconnecter</button>
            </>
            : 
            <>
              <button className="text-2xl mr-8" onClick={handleSignIn}>Se connecter</button>
              <button className="text-2xl" onClick={handleSignup}>S'inscrire</button>
            </>
            }
          </div>
          <button className={`"HAMBURGER-ICON space-y-2 p-4"`} onClick={handleClick}>
            <span className="block rounded-full h-1.5 w-12 animate-pulse bg-black"></span>
            <span className="block rounded-full h-1.5 w-12 animate-pulse bg-black"></span>
            <span className="block rounded-full h-1.5 w-12 animate-pulse bg-black"></span>
          </button>
          </div>
          
          <div className={`fixed flex flex-col justify-start h-[70vh] w-[20vw] top-[17vh] right-0 z-50 transform ${isOpen ? 'translate-x-0' : `translate-x-full`} transition-transform ease-linear duration-500 p-4 shadow-gray-400 shadow-xl rounded-lg bg-gray-200`}>
            
                     
            <ul className="flex flex-col items-start justify-end min-h-[250px] pl-4">
              <li className="hover:underline underline-offset-8 my-4 uppercase">
                <Link onClick={handleClick} className="text-sm font-semibold" href="/">
                  Accueil
                </Link>
              </li>
              <li className="hover:underline underline-offset-8 my-4 uppercase">
                <Link onClick={handleClick} className="text-sm font-semibold" href="/#">
                  Annuaire des artistes
                </Link>
              </li>
              <li className="hover:underline underline-offset-8 my-4 uppercase">
                <Link onClick={handleClick} className="text-sm font-semibold" href="/#">
                  à propos
                </Link>
              </li>
              <li className="hover:underline underline-offset-8 my-4 uppercase">
                <Link onClick={handleClick} className="text-sm font-semibold" href="/#">
                  Contact
                </Link>
              </li>
              <li className="hover:underline underline-offset-8 my-4 uppercase">
                <Link onClick={handleClick} className="text-sm font-semibold" href="/#">
                  Règlement & mentions légales
                </Link>
              </li>
              <li className="hover:underline underline-offset-8 my-4 uppercase">
                <Link onClick={handleClick} className="text-sm font-semibold" href="/demos">
                  Demos
                </Link>
              </li>
            </ul>
          </div>

        </section>
      </nav>

      <style>{`
      .hideMenuNav {
        display: none;
      }
      .showMenuNav {
        display: block;
        position: absolute;
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        background: white;
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
      }
    `}</style>
    </div>
  );
}
