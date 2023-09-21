import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href="/dev/buttons" className="bg-slate-300 rounded-md px-2">Page dev boutons</Link>
    </main>
  )
}
