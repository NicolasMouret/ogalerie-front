/* eslint-disable no-unused-vars */

'use client';

import { MouseEvent } from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import { LiaUserEditSolid } from 'react-icons/lia';

interface EditAvatarButtonProps {
    handleOnUpload: (result: any) => void;
    className?: string;
    avatar?: boolean;
}

export default function EditAvatarButton({ handleOnUpload, className, avatar }: EditAvatarButtonProps) {
  return (
    <CldUploadWidget uploadPreset="kgxd9epe" onUpload={handleOnUpload}>
      {({ open }) => {
        function handleOnClick(e: MouseEvent<HTMLButtonElement>) {
          e.preventDefault();
          open();
        }
        return (
          <button type="button" className={`${className} h-full w-full flex items-center justify-center`} onClick={handleOnClick}>
            <LiaUserEditSolid className="text-6xl text-gray-600 ml-3" />
          </button>
        );
      }}
    </CldUploadWidget>
  );
}

EditAvatarButton.defaultProps = {
  className: '',
  avatar: false,
};
