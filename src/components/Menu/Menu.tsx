/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

'use client';
import { useContext } from 'react';
import Link from 'next/link';
import CloseButton from '@/src/components/Buttons/CloseButton';
import { UiContext } from '@/src/contexts/UiContext';
import { UserContext } from '@/src/contexts/UserContext';

interface MenuButtonProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
/* eslint-disable react/self-closing-comp */
export default function Menu({ isOpen, setIsOpen }: MenuButtonProps) {
  const { user, setUser } = useContext(UserContext);
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
          <button className="HAMBURGER-ICON space-y-2" onClick={handleClick}>
            <span className="block h-0.5 w-8 animate-pulse bg-black"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-black"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-black"></span>
          </button>

          <div className={isOpen ? 'showMenuNav' : 'hideMenuNav'}>
            <div
              className="absolute top-0 right-0 px-8 py-8 "
            >
              <CloseButton onClick={handleClick}/>
            </div>
            <ul className="flex flex-col items-center justify-between min-h-[250px]">
              <li className="border-b border-gray-400 my-8 uppercase">
                <Link className="text-2xl font-semibold" href="/#">
                  Accueil
                </Link>
              </li>
              <li className="border-b border-gray-400 my-8 uppercase">
                <Link className="text-xl font-semibold" href="/#">
                  Annuaire des artistes
                </Link>
              </li>
              <li className="border-b border-gray-400 my-8 uppercase">
                <Link className="text-xl font-semibold" href="/#">
                  A propos
                </Link>
              </li>
              <li className="border-b border-gray-400 my-8 uppercase">
                <Link className="text-xl font-semibold" href="/#">
                  Contact
                </Link>
              </li>
              <li className="border-b border-gray-400 my-8 uppercase">
                <Link className="text-xl font-semibold" href="/#">
                  Réglement & mentions légales
                </Link>
              </li>
            </ul>
          </div>
        </section>

        <section className="DESKTOP-MENU hidden  space-x-2 lg:flex ">         
          <div className="md:flex mr-8">
          <div className={`flex items-center justify-around mr-8 gap-8 ${isOpen ? 'hidden' : ''}`}>
            {user.logged ? <div className="flex gap-8">
              <p className="font-semibold text-lg">{user.nickname}</p>
              <button className="font-semibold text-lg" onClick={handleDeconnect}>Se deconnecter</button>
            </div> : 
            <div className="flex gap-8">
            <button className="font-semibold text-lg" onClick={handleSignIn}>Se connecter</button>
            <button className="font-semibold text-lg" onClick={handleSignup}>S'inscrire</button>
          </div>}
          </div>
          <button className={`${isOpen?"hidden":"HAMBURGER-ICON space-y-2 p-4"}`} onClick={handleClick}>
            <span className="block h-1.5 w-12 animate-pulse bg-black"></span>
            <span className="block h-1.5 w-12 animate-pulse bg-black"></span>
            <span className="block h-1.5 w-12 animate-pulse bg-black"></span>
          </button>
          </div>
          
          <div className={`fixed top-3.5 right-0 z-50 transform ${isOpen ? 'translate-x-0' : `translate-x-full`} transition-transform ease-linear duration-500 p-4 shadow-gray-400 shadow-xl rounded-lg bg-gray-200`}>
            
            <div
              className="absolute top-0 right-0 px-8 py-8"
              
            >
              <CloseButton onClick={handleClick}/>
            </div>
            <ul className="flex flex-col items-center justify-between min-h-[250px]">
              <li className="border-b border-gray-400 my-8 uppercase">
                <Link className="text-sm font-semibold" href="/#">
                  Accueil
                </Link>
              </li>
              <li className="border-b border-gray-400 my-8 uppercase">
                <Link className="text-sm font-semibold" href="/#">
                  Annuaire des artistes
                </Link>
              </li>
              <li className="border-b border-gray-400 my-8 uppercase">
                <Link className="text-sm font-semibold" href="/#">
                  A propos
                </Link>
              </li>
              <li className="border-b border-gray-400 my-8 uppercase">
                <Link className="text-sm font-semibold" href="/#">
                  Contact
                </Link>
              </li>
              <li className="border-b border-gray-400 my-8 uppercase">
                <Link className="text-sm font-semibold" href="/#">
                  Réglement & mentions légales
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
