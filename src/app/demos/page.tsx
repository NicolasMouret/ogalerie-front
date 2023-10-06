import Link from "next/link";

export default function Demos() {
  return (
    <main className="flex h-[75vh] flex-col items-center gap-4 p-24">
      <Link href="/demos/buttons" className="bg-slate-300 rounded-md px-2">Page demo boutons</Link>
      <Link href="/demos/testCarousel" className="bg-slate-300 rounded-md px-2">Page demo carousel</Link>
      <Link href="/demos/addArtworkForm" className="bg-slate-300 rounded-md px-2">Page demo formulaire d'ajout d'une oeuvre</Link>
      <Link href="/demos/editArtwork" className="bg-slate-300 rounded-md px-2">Page demo formulaire de modification d'une oeuvre</Link>
      <Link href="/demos/comments" className="bg-slate-300 rounded-md px-2">Page demo bloc commentaires</Link>
      <Link href="/demos/2/artwork/1" className="bg-slate-300 rounded-md px-2">Page demo oeuvre</Link>
      <Link href="/demos/annuairePage" className="bg-slate-300 rounded-md px-2">Page demo annuaire d'artistes</Link>
      <Link href="/demos/alphabet" className="bg-slate-300 rounded-md px-2">Page demo filtre alphabet</Link>
      <Link href="/demos/contactPage" className="bg-slate-300 rounded-md px-2">Page demo page formulaire de contact</Link>
      <Link href="/demos/user/2" className="bg-slate-300 rounded-md px-2">Page demo page profil utilisateur public</Link>
      <Link href="/demos/artist/2" className="bg-slate-300 rounded-md px-2">Page demo page profil artiste public</Link>
      <Link href="/demos/artistprivateprofil" className="bg-slate-300 rounded-md px-2">Page demo page profil artiste privé</Link>
      <Link href="/demos/userPrivateProfil" className="bg-slate-300 rounded-md px-2">Page demo page profil utilisateur privé</Link>
      <Link href="/demos/a-propos" className="bg-slate-300 rounded-md px-2">Page demo à propos</Link>
      <Link href="/demos/reglement" className="bg-slate-300 rounded-md px-2">Page demo règlement et cgu</Link>
      

    </main>
  );
}