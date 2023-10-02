"use client";
import { CldUploadWidget } from 'next-cloudinary';

interface CloudinaryUploadProps {
    handleOnUpload: (result: any) => void;
}
 
export default function CloudinaryUpload({ handleOnUpload }: CloudinaryUploadProps) {
    return <CldUploadWidget uploadPreset="kgxd9epe" onUpload={handleOnUpload}>
  {({ open }) => {
    function handleOnClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
      e.preventDefault();
      open();
    }
    return (
      <button className="py-2 px-4 mt-2 border-2 text-m font-medium text-gray-700 border-gray-300 rounded" onClick={handleOnClick}>
        Upload an Image
      </button>
    );
  }}
</CldUploadWidget>
}

