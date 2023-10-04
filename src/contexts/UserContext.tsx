"use client"; 
import { ReactElement, createContext, useState } from 'react';

interface UserContextProps {
  user: {
    logged: boolean;
    avatar: string;
    nickname: string;
    token: string;
    situation?: string;
    id: number;
    town: string;
    country: string;
    biography: string;
    like: number;
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
    id: 0,
    town: '',
    country: '',
    biography: '',
    like: 0,
    lastname: '',
    firstname: '',
    birthday: '',
    email: '',
  },
  setUser: () => {},
});

function UserContextProvider({ children }: { children: ReactElement }) {
  const [user, setUser] = useState({logged: false, id: 0, nickname: '', token: '', situation: '', avatar: '', town: '', country: '', biography: '', like: 0, lastname: '', firstname: '', birthday: '', email: ''});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContextProvider, UserContext };