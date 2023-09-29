"use client"; 
import { ReactElement, createContext, useState } from 'react';

interface UserContextProps {
  user: {
    logged: boolean;
    nickname?: string;
    token?: string;
    situation?: string;
  }
setUser: React.Dispatch<React.SetStateAction<{logged: boolean}>>;
}

const UserContext = createContext<UserContextProps>({
  user: {
    logged: false,
    nickname: '',
    token: '',
    situation: '',
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