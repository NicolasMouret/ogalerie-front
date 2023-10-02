import Link from "next/link";

export default function Demos() {
  return (
    <main className="flex h-[75vh] flex-col items-center gap-4 p-24">
      <Link href="/demos/buttons" className="bg-slate-300 rounded-md px-2">Page demo boutons</Link>
      <Link href="/demos/testCarousel" className="bg-slate-300 rounded-md px-2">Page demo carousel</Link>
      <Link href="/demos/addArtworkForm" className="bg-slate-300 rounded-md px-2">Page demo formulaire d'ajout d'une oeuvre</Link>
      <Link href="/demos/editArtwork" className="bg-slate-300 rounded-md px-2">Page demo formulaire de modification d'une oeuvre</Link>
      <Link href="/demos/comments" className="bg-slate-300 rounded-md px-2">Page demo bloc commentaires</Link>
      <Link href="/demos/artwork" className="bg-slate-300 rounded-md px-2">Page demo oeuvre</Link>
      <Link href="/demos/annuairePage" className="bg-slate-300 rounded-md px-2">Page demo annuaire d'artistes</Link>
      <Link href="/demos/alphabet" className="bg-slate-300 rounded-md px-2">Page demo filtre alphabet</Link>
      <Link href="/demos/contactPage" className="bg-slate-300 rounded-md px-2">Page demo page formulaire de contact</Link>
      <Link href="/demos/userPublicProfil" className="bg-slate-300 rounded-md px-2">Page demo page profil utilisateur public</Link>
    
    </main>
  );
}