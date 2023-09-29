import Image from 'next/image'
import SignalButton from '@/src/components/Buttons/SignalButton'

interface CommentProps {
    avatar: string;
    nickname: string;
    date: string;
    content: string;
}

export default function Comment({avatar, nickname, date, content}: CommentProps) {
    return (
      <div className="flex gap-4 ">
        <Image
        className="rounded-full h-fit"
        src={avatar}
        alt="Photo de profil de l'auteur"
        width={45}
        height={45}
        />
        <div className="flex flex-col max-w-[70%] ">
            <p>{nickname} - {date}</p>
            <p>{content}</p>
        </div>
        <SignalButton className="ml-auto text-left w-2/12 max-h-8" />
      </div>
      )
}