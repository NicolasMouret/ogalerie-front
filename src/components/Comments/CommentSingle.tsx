/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Comment } from '@/src/@types';

interface CommentProps {
  handleDelete: (id: string) => void;
  className?: string;
  comment: Comment;
}

export default function CommentSingle({
  comment, className, handleDelete,
}: CommentProps) {
  const [isOwner, setIsOwner] = useState(false);
  const avatar = comment.avatar ? comment.avatar : '/DefaultAvatar.svg';
  const {
    id, owner: nickname, created_at: date, content, owner_id: userId,
  } = comment;

  const setDate = (date: string) => {
    const isoDate = new Date(date);
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = isoDate.toLocaleDateString('fr-FR', options);
    return formattedDate;
  };
  const formattedDate = setDate(date);

  useEffect(
    () => {
      if (localStorage.getItem('id') === userId.toString()) {
        setIsOwner(true);
      } else {
        setIsOwner(false);
      }
    },
    [userId],
  );

  return (
    <div className={`flex items-center gap-4 group ${className}`}>
      <Link href={`/user/${userId}`} className="relative w-10 h-10 md:w-12 md:h-12 overflow-hidden">
        <Image
          className="absolute top-0 left-0 object-cover object-center rounded-full w-full h-full"
          src={avatar}
          alt="Photo de profil de l'auteur"
          layout="fill"
        />
      </Link>
      <div className="flex flex-col max-w-[70%] text-sm sm:text-base">
        <p>
          <Link href={`/user/${userId}`}>{nickname}</Link>
          -
          {' '}
          {formattedDate}
        </p>
        <p className="text-sm sm:text-base">{content}</p>
      </div>
      {isOwner && <button type="button" onClick={() => handleDelete(id.toString())} className="ml-auto text-left w-2/12 max-h-8 hidden group-hover:block"><RiDeleteBin6Line /></button>}
    </div>
  );
}
