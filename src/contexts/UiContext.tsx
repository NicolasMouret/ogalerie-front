"use client"; 
import { ReactElement, createContext, useState } from 'react';

interface UiContextProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const UiContext = createContext<UiContextProps>({
  showModal: false,
  setShowModal: () => {},
});

function UiContextProvider({ children }: { children: ReactElement }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <UiContext.Provider value={{ showModal, setShowModal }}>
      {children}
    </UiContext.Provider>
  );
}

export { UiContextProvider, UiContext };