"use client";

import { useState, useRef, useContext } from 'react';
import { nanoid } from 'nanoid';
import { UserContext } from '@/src/contexts/UserContext';
import InputEmoji from 'react-input-emoji'
import Comment from './Comment'

const commentsRawList = [
  { avatar: "https://picsum.photos/id/500/360/350",
    nickname: "Fred",
    date: "29 Août 2023",
    content: "Superbe !" },
  { avatar: "https://picsum.photos/id/501/360/350",
    nickname: "Bob",
    date: "2 Septembre 2023",
    content: "Pas mal, mais pas ma préférée de cet artiste." },
  { avatar: "https://picsum.photos/id/502/360/350",
    nickname: "Peter Parker",
    date: "3 Septembre 2023",
    content: "Très laid..." },
  { avatar: "https://picsum.photos/id/503/360/350",
    nickname: "Fred",
    date: "29 Août 2023",
    content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates libero perferendis molestiae accusamus, consequuntur autem aliquam maiores debitis fugiat voluptatem!" },
  { avatar: "https://picsum.photos/id/504/360/350",
    nickname: "Bob",
    date: "2 Septembre 2023",
    content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates libero perferendis molestiae accusamus." },
  { avatar: "https://picsum.photos/id/505/360/350",
    nickname: "Peter Parker",
    date: "3 Septembre 2023",
    content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates libero perferendis molestiae accusamus, consequuntur autem aliquam maiores debitis fugiat voluptatem!" },   
]

interface comment {
  id: number;
  content: string;
  created_at: string;
  owner: string;
  owner_id: number;
  avatar: string;
}

export default function CommentsBlock({comments}: {comments: comment[]}) {
  const [text, setText] = useState("");
  const { user } = useContext(UserContext);
  const commentsContainerRef = useRef<HTMLDivElement>(null);

  const commentsList = comments.map((comment) => {
    return (
      <Comment
        key={nanoid()}
        avatar={comment.avatar}
        nickname={comment.owner}
        date={comment.created_at}
        content={comment.content}
        userId={comment.owner_id.toString()}
      />
    )
  })

  const onEnter = (text: string) => {
    //add at the beginning of the array
   commentsRawList.unshift(
    { avatar: "https://picsum.photos/id/506/360/350",
    nickname: `${user.nickname ? user.nickname : "Anonyme"}`,
    date: "29 Septembre 2023",
    content: text },
   )
    commentsContainerRef.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <div className="flex flex-col justify-between overflow-hidden pt-2 h-[77vh] md:h-[35vh] md:max-h-[400px] w-[95vw] md:w-[700px] rounded-2xl border-gray-400 border-2">
      <div ref={commentsContainerRef} className="flex flex-col justify-between gap-4 overflow-auto h-[75%] pl-6 py-2">
        {commentsList}
      </div>
      <div className="flex h-[15%] md:max-h-[20%] w-[95%] mx-auto border-gray-300 border-t-2">
      <InputEmoji
          value={text}
          onChange={setText}
          borderColor='transparent'
          cleanOnEnter
          placeholder="Ajoutez un commentaire"
          aria-label="Ajoutez un commentaire"
          language='fr'
          onEnter={onEnter}
          shouldReturn
        />
      </div>
    </div>
    )
}