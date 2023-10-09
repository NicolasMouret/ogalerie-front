"use client";
import { CldUploadWidget } from 'next-cloudinary';
import { LiaUserEditSolid } from 'react-icons/lia';

interface EditAvatarButton {
    handleOnUpload: (result: any) => void;
    className?: string;
    avatar?: boolean;
}
 
export default function EditAvatarButton({ handleOnUpload, className, avatar }: EditAvatarButton) {
    return <CldUploadWidget uploadPreset="kgxd9epe" onUpload={handleOnUpload}>
  {({ open }) => {
    function handleOnClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
      e.preventDefault();
      open();
    }
    return (
      <button className={`${className} h-full w-full flex items-center justify-center`} onClick={handleOnClick}>
        <LiaUserEditSolid className="text-6xl text-gray-600 ml-3"/>
      </button>
    );
  }}
</CldUploadWidget>
}