"use client";

import InputEmoji from 'react-input-emoji'
import Comment from './Comment'
import { useState, useEffect, useRef } from 'react';

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

export default function CommentsBlock() {
  const [text, setText] = useState("");
  const commentsContainerRef = useRef<HTMLDivElement>(null);

  const commentsList = commentsRawList.map((comment) => {
    return (
      <Comment
        key={comment.avatar}
        avatar={comment.avatar}
        nickname={comment.nickname}
        date={comment.date}
        content={comment.content}
      />
    )
  })

  const onEnter = (text: string) => {
    //add at the beginning of the array
   commentsRawList.unshift(
    { avatar: "https://picsum.photos/id/506/360/350",
    nickname: "Utilisateur test",
    date: "29 Septembre 2023",
    content: text },
   )
    commentsContainerRef.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <div className="flex flex-col justify-between overflow-hidden pt-4 h-[30vh] w-[600px] rounded-2xl border-gray-400 border-2">
      <div ref={commentsContainerRef} className="flex flex-col justify-between gap-4 overflow-auto h-[75%] pl-6 py-2">
        {commentsList}
      </div>
      <div className="flex max-h-[20%] w-[95%] mx-auto border-gray-300 border-t-2">
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