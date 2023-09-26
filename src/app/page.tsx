import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-4 p-24">
      <Link href="/buttons" className="bg-slate-300 rounded-md px-2">Page demo boutons</Link>
      <Link href="/testCarousel" className="bg-slate-300 rounded-md px-2">Page demo carousel</Link>
      <Link href="/connexionForm" className="bg-slate-300 rounded-md px-2">Page demo formulaire de connexion</Link>
      <Link href="/addArtworkForm" className="bg-slate-300 rounded-md px-2">Page demo formulaire d'ajout d'une oeuvre</Link>
      <Link href="/editArtwork" className="bg-slate-300 rounded-md px-2">Page demo formulaire de modification d'une oeuvre</Link>
      <Link href="/authentification" className="bg-slate-300 rounded-md px-2">Page demo formulaire d'inscription</Link>



    </main>
  );
}