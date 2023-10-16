/* eslint-disable react/require-default-props */
/* eslint-disable no-unused-vars */

'use client';

import { MouseEvent } from 'react';
import { CldUploadWidget } from 'next-cloudinary';

interface CloudinaryUploadProps {
    handleOnUpload: (result: any) => void;
    className?: string;
    avatar?: boolean;
}

export default function CloudinaryUpload({ handleOnUpload, className, avatar }: CloudinaryUploadProps) {
  return (
    <CldUploadWidget uploadPreset="kgxd9epe" onUpload={handleOnUpload}>
      {({ open }) => {
        function handleOnClick(e: MouseEvent<HTMLButtonElement>) {
          e.preventDefault();
          open();
        }
        return (
          <button type="button" className={`${className} py-2 px-4 mx-auto border-2 text-m font-medium text-gray-700 border-gray-300 rounded`} onClick={handleOnClick}>
            {avatar ? 'Ajouter un avatar' : 'Ajouter une image'}
          </button>
        );
      }}
    </CldUploadWidget>
  );
}
