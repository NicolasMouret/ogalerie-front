/* eslint-disable no-unused-vars */

'use client';

import { useState, ChangeEvent } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { MdModeEdit } from 'react-icons/md';
import axiosInstance from '@/src/utils/axios';

interface CollectionTitleProps {
  originalTitle: string;
  id: string;
  handleDeleteClick: (id: string) => void;
}

function CollectionTitle({ originalTitle, id, handleDeleteClick }: CollectionTitleProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(originalTitle);

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsEditing(false);
    axiosInstance.patch(`/collections/${id}`, {
      title,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      setTitle(res.data.title);
    }).catch((err) => {
      console.log(err);
    });
  };

  const handleClose = () => {
    setIsEditing(false);
    setTitle(originalTitle);
  };

  return (
    <h3 className="w-[90vw] py-2 md:w-[84vw] text-xl font-extrabold mx-auto flex items-center group mr-4">
      {isEditing
        ? (
          <OutsideClickHandler onOutsideClick={handleClose}>
            <form onSubmit={handleSubmit}>
              <input
                name="collectionTitle"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="outline-none w-[60vw] sm:w-[250px] pl-2 border-2 border-gray-300 rounded-md"
                type="text"
                placeholder="Titre de la collection"
              />
              <button type="submit" className="ml-2 px-2 bg-slate-100 border-2 text-m font-medium border-gray-400 rounded">Valider</button>
            </form>
          </OutsideClickHandler>
        )
        : title}
      {!isEditing
      && (
        <>
          <button type="button" onClick={() => setIsEditing(true)}>
            <MdModeEdit className="text-xl ml-2 md:hidden group-hover:block" />
          </button>
          <button type="button" onClick={() => handleDeleteClick(id)}>
            <RiDeleteBin6Line className="text-xl ml-2 md:hidden group-hover:block" />
          </button>
        </>
      )}
    </h3>
  );
}

export default CollectionTitle;
