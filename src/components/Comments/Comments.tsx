'use client';

import {
  useState, useEffect, JSX, useContext,
} from 'react';
import InputEmoji from 'react-input-emoji';
import { UserContext } from '@/src/contexts/UserContext';
import axiosInstance from '@/src/utils/axios';
import CommentSingle from './CommentSingle';
import { Comment } from '@/src/@types';

interface CommentsBlockProps {
  comments: Comment[];
  userId: string;
  artworkId: string;
}

export default function CommentsBlock({ comments, userId, artworkId }: CommentsBlockProps) {
  const [text, setText] = useState('');
  const { user } = useContext(UserContext);
  const [commentsRaw, setCommentsRaw] = useState<Comment[]>(comments);
  const [commentsList, setCommentsList] = useState<JSX.Element[]>();

  useEffect(
    () => {
      const handleDelete = (id: string) => {
        console.log('id', id);
        axiosInstance.delete(`/comments/${id}`)
          .then((res) => {
            console.log('res.data', res.data);
            const comments = commentsRaw.filter((comment) => comment.id !== parseInt(id, 10));
            setCommentsRaw(comments);
          })
          .catch((err) => {
            console.log(err);
          });
      };

      const createCommentsList = (comments: Comment[]) => (comments.map((comment) => (
        <CommentSingle
          key={comment.id}
          comment={comment}
          handleDelete={handleDelete}
        />
      )));

      setCommentsList(createCommentsList(commentsRaw));
    },
    [commentsRaw, comments],
  );

  const onEnter = () => {
    console.log('text before enter', text);
    const payload = {
      content: text,
      artwork_id: artworkId,
    };
    axiosInstance.post(`/users/${userId}/comments`, {
      data: payload,
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      console.log('res.data comments', res.data);
      const comment = res.data;
      setCommentsRaw([comment, ...commentsRaw]);
    }).catch((err) => {
      console.log(err);
      console.log(payload);
      throw err;
    });
    console.log('comments after enter final', comments);
  };

  return (
    <div className="flex flex-col justify-between pt-2 mx-auto md:mx-0 mb-4 h-fit max-h-[50vh] md:h-[35vh] md:max-h-[400px] w-[90vw] md:w-[700px] rounded-2xl border-gray-400 border-2">
      <div className="flex flex-col justify-start gap-4 overflow-auto h-[75%] pl-6 py-2">
        {commentsList}
      </div>
      {user.logged && (
      <div className="flex h-[15%] md:max-h-[20%] w-[95%] mx-auto border-gray-300 border-t-2 mt-3">
        <InputEmoji
          value={text}
          onChange={setText}
          borderColor="transparent"
          cleanOnEnter
          placeholder="Ajoutez un commentaire"
          aria-label="Ajoutez un commentaire"
          language="fr"
          onEnter={onEnter}
        />
      </div>
      )}
    </div>
  );
}
