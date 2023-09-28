import Link from "next/link";

export default function Demos() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-4 p-24">
      <Link href="/demos/buttons" className="bg-slate-300 rounded-md px-2">Page demo boutons</Link>
      <Link href="/demos/testCarousel" className="bg-slate-300 rounded-md px-2">Page demo carousel</Link>
      <Link href="/demos/connexionForm" className="bg-slate-300 rounded-md px-2">Page demo formulaire de connexion</Link>
      <Link href="/demos/addArtworkForm" className="bg-slate-300 rounded-md px-2">Page demo formulaire d'ajout d'une oeuvre</Link>
      <Link href="/demos/editArtwork" className="bg-slate-300 rounded-md px-2">Page demo formulaire de modification d'une oeuvre</Link>
      <Link href="/demos/authentification" className="bg-slate-300 rounded-md px-2">Page demo formulaire d'inscription</Link>
    </main>
  );
}