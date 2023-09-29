"use client";

import InputEmoji from 'react-input-emoji'
import Image from 'next/image'
import SignalButton from '@/src/components/Buttons/SignalButton'
import { useState } from 'react';

function Comment() {
  return (
    <div className="flex gap-4 ">
      <Image
      className="rounded-full h-fit"
      src="https://picsum.photos/id/500/360/350"
      alt="Picture of the author"
      width={50}
      height={50}
      />
      <div className="flex flex-col max-w-[70%] ">
          <p>Fred - 29 août 2023</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde corrupti recusandae voluptas ullam perspiciatis optio illum omnis eligendi</p>
      </div>
      <SignalButton className="ml-auto text-left w-2/12 max-h-8" />
    </div>
    )
}


export default function CommentsBlock() {
  const [text, setText] = useState("");
  return (
    <div className="flex flex-col justify-between overflow-hidden pt-4 h-[30vh] w-[600px] rounded-2xl border-gray-400 border-2">
      <div className="flex flex-col justify-between gap-2 overflow-auto h-[75%] pl-6 py-2">
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
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
          shouldReturn
        />
      {/* <textarea className="w-[95%] mx-auto justify-self-end border-gray-300 border-t-2 resize-none outline-none"
      name="commentInput"
      rows={2} 
      placeholder="Ajoutez un commentaire" 
      aria-label="Ajoutez un commentaire"></textarea> */}
      </div>
    </div>
    )
}