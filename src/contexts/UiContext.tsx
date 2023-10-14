/* eslint-disable react/jsx-no-constructed-context-values */

'use client';

import {
  ReactElement, createContext, useState, Dispatch, SetStateAction,
} from 'react';

interface UiContextProps {
  showModalSignIn: boolean;
  setShowModalSignIn: Dispatch<SetStateAction<boolean>>;
  showModalSignUp: boolean;
  setShowModalSignUp: Dispatch<SetStateAction<boolean>>;
  showModalAddArtwork: boolean;
  setShowModalAddArtwork: Dispatch<SetStateAction<boolean>>;
  showModalEditArtwork: boolean;
  setShowModalEditArtwork: Dispatch<SetStateAction<boolean>>;
}

const UiContext = createContext<UiContextProps>({
  showModalSignIn: false,
  setShowModalSignIn: () => {},
  showModalSignUp: false,
  setShowModalSignUp: () => {},
  showModalAddArtwork: false,
  setShowModalAddArtwork: () => {},
  showModalEditArtwork: false,
  setShowModalEditArtwork: () => {},
});

function UiContextProvider({ children }: { children: ReactElement }) {
  const [showModalSignIn, setShowModalSignIn] = useState(false);
  const [showModalSignUp, setShowModalSignUp] = useState(false);
  const [showModalAddArtwork, setShowModalAddArtwork] = useState(false);
  const [showModalEditArtwork, setShowModalEditArtwork] = useState(false);

  return (
    <UiContext.Provider value={{
      showModalSignIn,
      setShowModalSignIn,
      showModalSignUp,
      setShowModalSignUp,
      showModalAddArtwork,
      setShowModalAddArtwork,
      showModalEditArtwork,
      setShowModalEditArtwork,
    }}
    >
      {children}
    </UiContext.Provider>
  );
}

export { UiContextProvider, UiContext };
