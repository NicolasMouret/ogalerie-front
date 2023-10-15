'use client';

import { useEffect, useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserContext } from '@/src/contexts/UserContext';
import axiosInstance from '@/src/utils/axios';
import Menu from '../Menu/Menu';

export default function Header() {
  const pathname = usePathname();
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    if (localStorage.getItem('OgToken')) {
      const token = localStorage.getItem('OgToken');
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
      const id = localStorage.getItem('id');
      axiosInstance.get(`/users/${id}`)
        .then((res) => {
          console.log(res.data);
          setUser({ logged: true, ...res.data });
        }).catch((err) => {
          console.log(err);
          localStorage.removeItem('OgToken');
          localStorage.removeItem('id');
          setUser({ logged: false });
          localStorage.removeItem('nickname');
          localStorage.removeItem('situation');
          throw err;
        });
    }
  }, [setUser]);

  if (pathname === '/') {
    return (
      <header className="flex justify-around items-center w-screen h-[15vh] md:h-[25vh]">
        <div className="w-7/12 md:w-2/5 md:p-2 slide-in-left">
          <Link href="/"><Image height={280} width={560} alt="logo" src="/images/logobig.png" style={{ maxHeight: '95%' }} /></Link>
        </div>
        <Menu />
      </header>
    );
  }
  return (
    <header className="flex justify-evenly md:justify-between md:gap-28 items-center md:items-stretch w-screen h-[15vh] md:h-[15vh]">
      <div className="self-auto md:p-4 w-7/12 container ml-14 md:w-2/5 md:mr-14 md:ml-16 md:m-5">
        <Link href="/"><Image height={130} width={260} alt="logo" src="/images/logobig.png" /></Link>
      </div>
      <Menu />
    </header>
  );
}
