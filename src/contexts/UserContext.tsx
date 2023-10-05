"use client"; 
import { ReactElement, createContext, useState } from 'react';

export interface UserContextProps {
  user: {
    logged: boolean;
    avatar: string;
    nickname: string;
    token: string;
    situation?: string;
    id: string;
    town: string;
    country: string;
    biography: string;
    like: number;
    liked: number;
    lastname: string;
    firstname: string;
    birthday: string;
    email: string;
  }
  setUser: (user: any) => void;
}

const UserContext = createContext<UserContextProps>({
  user: {
    logged: false,
    nickname: '',
    token: '',
    situation: '',
    avatar: '',
    id: '',
    town: '',
    country: '',
    biography: '',
    like: 0,
    liked: 0,
    lastname: '',
    firstname: '',
    birthday: '',
    email: '',
  },
  setUser: () => {},
});

function UserContextProvider({ children }: { children: ReactElement }) {
  const [user, setUser] = useState({logged: false, id: '', nickname: '', token: '', situation: '', avatar: '', town: '', country: '', biography: '', like: 0, liked: 0, lastname: '', firstname: '', birthday: '', email: '',});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContextProvider, UserContext };