"use client"; 
import { ReactElement, createContext, useState } from 'react';

interface UiContextProps {
  showModalSignIn: boolean;
  setShowModalSignIn: React.Dispatch<React.SetStateAction<boolean>>;
  showModalSignUp: boolean;
  setShowModalSignUp: React.Dispatch<React.SetStateAction<boolean>>;
}

const UiContext = createContext<UiContextProps>({
  showModalSignIn: false,
  setShowModalSignIn: () => {},
  showModalSignUp: false,
  setShowModalSignUp: () => {},
});

function UiContextProvider({ children }: { children: ReactElement }) {
  const [showModalSignIn, setShowModalSignIn] = useState(false);
  const [showModalSignUp, setShowModalSignUp] = useState(false);

  return (
    <UiContext.Provider value={{ showModalSignIn, setShowModalSignIn, showModalSignUp, setShowModalSignUp }}>
      {children}
    </UiContext.Provider>
  );
}

export { UiContextProvider, UiContext };