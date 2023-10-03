"use client"; 
import { ReactElement, createContext, useState } from 'react';

interface UserContextProps {
  user: {
    logged: boolean;
    avatar?: string;
    nickname?: string;
    token?: string;
    situation?: string;
    id?: number;
  }
setUser: React.Dispatch<React.SetStateAction<{logged: boolean}>>;
}

const UserContext = createContext<UserContextProps>({
  user: {
    logged: false,
    nickname: '',
    token: '',
    situation: '',
    avatar: '',
  },
 setUser: () => {},
});

function UserContextProvider({ children }: { children: ReactElement }) {
  const [user, setUser] = useState({logged: false});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContextProvider, UserContext };