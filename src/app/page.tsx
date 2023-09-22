import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-4 p-24">
      <Link href="/buttons" className="bg-slate-300 rounded-md px-2">Page demo boutons</Link>
      <Link href="/testCarousel" className="bg-slate-300 rounded-md px-2">Page demo carousel</Link>
    </main>
  );
}
