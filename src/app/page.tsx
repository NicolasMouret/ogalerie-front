"use client";
import { useContext } from "react";
import { UiContext, UiContextProvider } from "../contexts/UiContext";

import ConnexionForm from "../components/Forms/ConnexionForm";

export default function Home() {
  const { showModal, setShowModal } = useContext(UiContext);
  return (
    <UiContextProvider>
      <main className="relative">
        <ConnexionForm />
        {showModal ? <p>true</p> : <p>false</p>}
      </main>
    </UiContextProvider>
  );
}