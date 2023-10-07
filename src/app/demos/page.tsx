import Link from "next/link";

export default function Demos() {
  return (
    <main className="flex h-[75vh] flex-col items-center gap-4 p-24">    
      <Link href="/artwork/1" className="bg-slate-300 rounded-md px-2">Page demo oeuvre</Link>     
      <Link href="/user/3" className="bg-slate-300 rounded-md px-2">Page demo page profil utilisateur public</Link>
      <Link href="/artist/2" className="bg-slate-300 rounded-md px-2">Page demo page profil artiste public</Link>     
    </main>
  );
}