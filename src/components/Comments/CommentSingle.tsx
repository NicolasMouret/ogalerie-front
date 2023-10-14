/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-unused-vars */
import Image from 'next/image';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Link from 'next/link';
import { useEffect, useState } from 'react';

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

export default function CommentSingle({
  avatar, nickname, date, content, className, userId, id, handleDelete,
}: CommentProps) {
  const [isOwner, setIsOwner] = useState(false);
  const setDate = (date: string) => {
    const isoDate = new Date(date);
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = isoDate.toLocaleDateString('fr-FR', options);
    return formattedDate;
  };
  const formattedDate = setDate(date);

  useEffect(
    () => {
      if (localStorage.getItem('id') === userId) {
        setIsOwner(true);
      } else {
        setIsOwner(false);
      }
    },
    [userId],
  );

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
        <p>
          <Link href={`/user/${userId}`}>{nickname}</Link>
          -
          {' '}
          {formattedDate}
        </p>
        <p>{content}</p>
      </div>
      {isOwner && <button type="button" onClick={() => handleDelete(id)} className="ml-auto text-left w-2/12 max-h-8 hidden group-hover:block"><RiDeleteBin6Line /></button>}
    </div>
  );
}

CommentSingle.defaultProps = {
  className: '',
};
