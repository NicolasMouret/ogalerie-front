import Image from 'next/image'
import SignalButton from '@/src/components/Buttons/SignalButton'

interface CommentProps {
    avatar: string;
    nickname: string;
    date: string;
    content: string;
    className?: string;
}

export default function Comment({avatar, nickname, date, content, className}: CommentProps) {
  const setDate = (date: string) => {
    const isoDate = new Date(date);
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = isoDate.toLocaleDateString('fr-FR', options);
    return formattedDate;
  }

  const formattedDate = setDate(date);

    return (
      <div className={`flex gap-4 group ${className}`}>
        <Image
        className="rounded-full h-fit"
        src={avatar}
        alt="Photo de profil de l'auteur"
        width={40}
        height={40}
        />
        <div className="flex flex-col max-w-[70%]">
            <p>{nickname} - {formattedDate}</p>
            <p>{content}</p>
        </div>
        <SignalButton className="ml-auto text-left w-2/12 max-h-8 hidden group-hover:block" />
      </div>
      )
}