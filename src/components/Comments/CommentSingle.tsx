import Image from 'next/image'
import axiosInstance from '@/src/utils/axios';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Link from 'next/link'
import axios from '@/src/utils/axios';

interface CommentProps {
    handleDelete: (id: string) => void;
    avatar: string;
    nickname: string;
    date: string;
    content: string;
    className?: string;
    userId: string;
    id: string;
}

export default function CommentSingle({avatar, nickname, date, content, className, userId, id, handleDelete}: CommentProps) {
  const setDate = (date: string) => {
    const isoDate = new Date(date);
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = isoDate.toLocaleDateString('fr-FR', options);
    return formattedDate;
  }
  const formattedDate = setDate(date);

    return (
      <div className={`flex items-center gap-4 group ${className}`}>
        <Link className="h-[90%]" href={`/user/${userId}`}>
        <Image
        className="rounded-full h-[90%]"
        src={avatar}
        alt="Photo de profil de l'auteur"
        width={40}
        height={40}
        />
        </Link>
        <div className="flex flex-col max-w-[70%]">
            <p><Link href={`/user/${userId}`}>{nickname}</Link>- {formattedDate}</p>
            <p>{content}</p>
        </div>
        <button onClick={() => handleDelete(id)} className="ml-auto text-left w-2/12 max-h-8 hidden group-hover:block"><RiDeleteBin6Line  /></button>
      </div>
      )
}