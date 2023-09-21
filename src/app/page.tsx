import LikeButton from "./components/Buttons/LikeButton"
import FaveButton from "./components/Buttons/FaveButton"
import SignalButton from "./components/Buttons/SignalButton"
import ModerationButton from "./components/Buttons/ModerationButton"
import CloseButton from "./components/Buttons/CloseButton"
import ScrollButton from "./components/Buttons/ScrollButton"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex gap-4 ">
      <LikeButton />
      <FaveButton />
      <SignalButton />
      <ModerationButton />
      <CloseButton />
      <ScrollButton direction="up" />
      <ScrollButton direction="down" />
      </div>
    </main>
  )
}
