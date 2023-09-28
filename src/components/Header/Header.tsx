'use client';

import { useState } from 'react';
import Image from 'next/image';
import Menu from '../Menu/Menu';
import logo from '../../../assets/images/logo.png';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="flex flex-row  justify-evenly md:justify-between md:gap-28 items-center md:items-stretch w-screen h-1/3">
      <div className="self-auto p-4 h-full w-7/12 container ml-14 md:w-2/5 md:mr-14 md:p-5 md:m-5">
        <Image object-fit="fill" alt="logo" src={logo} />
      </div>
      <Menu isOpen={isOpen} setIsOpen={setIsOpen} />
    </header>
  );
}