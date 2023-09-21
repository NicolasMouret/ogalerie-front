import LikeButton from "./components/LikeButton"
import FaveButton from "./components/FaveButton"
import SignalButton from "./components/SignalButton"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex gap-4">
      <LikeButton />
      <FaveButton />
      <SignalButton />
      </div>
    </main>
  )
}
