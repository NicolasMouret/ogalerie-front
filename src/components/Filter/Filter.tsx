'use client';

import axiosInstance from '@/src/utils/axios';
import { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import CloseButton from '@/src/components/Buttons/CloseButton';
import { Tag, Artwork, Collection } from '@/src/@types';

interface FilterProps {
  handleClose: () => void
  setCollectionSearch:  React.Dispatch<React.SetStateAction<Collection | undefined>>
}

export default function Filter({ handleClose, setCollectionSearch }: FilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tagStyle, setTagStyle] = useState<Tag[]>([]);
  const [tagSupport, setTagSupport] = useState<Tag[]>([]);
  const [tagType, setTagType] = useState<Tag[]>([]);

  const moveObjectToEnd = (array: Tag[], attribute: string, value: string) => {
    // Find the index of the object with the specified attribute value
    const index = array.findIndex(tag => tag[attribute as keyof Tag] === value);
  
    // If the object is found, move it to the end of the array
    if (index !== -1) {
      const objectToMove = array.splice(index, 1)[0]; // Remove the object from its current position
      array.push(objectToMove); // Add the object to the end of the array
    }
  }

  useEffect(() => {
    const newTagStyle: Tag[] = [];
    const newTagSupport: Tag[] = [];
    const newTagType: Tag[] = [];

    const getTag = () => {
      axiosInstance.get<Tag[]>(`/tags`)
        .then(res => {
          res.data.map((tag: Tag) => {
            if (tag.category === "style") {
              newTagStyle.push(tag);            
            }
            if (tag.category === "support") {
              newTagSupport.push(tag);
            }
            if (tag.category === "type") {
              newTagType.push(tag);
            }})
          moveObjectToEnd(newTagStyle, "name", "autre");
          moveObjectToEnd(newTagSupport, "name", "autre");
          moveObjectToEnd(newTagType, "name", "autre");
          setTagStyle(newTagStyle);
          setTagSupport(newTagSupport);
          setTagType(newTagType);
        }).catch(err => {
          throw err;
        })
    }
    getTag();
  }, []);

  const getSearchResults = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   axiosInstance.get<Artwork[]>(`/artworks/filter/?${searchParams.toString()}`)
      .then(res => {
        setCollectionSearch({
          id: 2,
          title: "SearchResult",
          artworks: res.data
        })
      }).catch(err => {
        throw err;
      })
  handleClose();
  }

  const handleChange = (tag: Tag) => {
  
    if (!searchParams.has(`${tag.category}`)) {
      console.log(searchParams.has(`${tag.category}`));
      router.push(`?${searchParams.toString() && searchParams.toString() + '&' }${tag.category}=${tag.id}`);
    }
    if (searchParams.has(`${tag.category}`) && searchParams.get(`${tag.category}`) !== tag.id.toString()) {
      console.log(searchParams.has(`${tag.category}`));
      router.push(`?${searchParams.toString().replace(`${tag.category}=${searchParams.get(`${tag.category}`)}`, `${tag.category}=${tag.id}`)}`);
    }
    }
    
  return (  
      <div className="fixed flex flex-col justify-start h-[97vh] md:h-[400px] w-[95vw] md:w-[550px] top-[2vh] md:top-[20vh] right-0 z-50 transform translate-x-0 transition-transform ease-linear duration-700 p-4 shadow-gray-400 shadow-xl rounded-lg bg-gray-200">
        <CloseButton
          className="self-end text-gray-700 hover-bg-gray-200 active-bg-gray-400 p-1 rounded-full w-10 h-10 flex items-center justify-center"
          onClick={handleClose}
        />
        <h2 className='font-bold text-center mb-6'>Filtrer par tags</h2>  
        <form onSubmit={getSearchResults}> 
        <div className="flex flex-col pl-2 md:pl-4 gap-2 sm:flex-row sm:justify-around">
          <ul className="sm:w-[30%]">
            <h2 className='font-semibold pb-1'>Type</h2>
            {tagType.map((tag: Tag) => {
              return (
                <li className="space-x-1.5 ml-2" key={tag.id}>
                  <input className="" onChange={() => handleChange(tag)} type="radio" id={tag.id.toString()} name={tag.category} value={tag.id} />
                  <label className="capitalize" htmlFor={tag.id.toString()}>{tag.name}</label>                                  
                </li>
              )
            })}
          </ul>  
          <ul className="sm:w-[30%]">
            <h2 className='font-semibold pb-2'>Support</h2>
            {tagSupport.map((tag: Tag) => {
              return (
                <li className="space-x-1.5 ml-2" key={tag.id}>
                  <input className="" onChange={() => handleChange(tag)} type="radio" id={tag.id.toString()} name={tag.category} value={tag.id} />
                  <label className="capitalize" htmlFor={tag.id.toString()}>{tag.name}</label>                                  
                </li>
              )
            })}
          </ul>
          <ul className="sm:w-[30%]">
            <h2 className='font-semibold pb-2'>Style</h2>
            {tagStyle.map((tag: Tag) => {
              return (
                <li className="space-x-1.5 ml-2" key={tag.id}>
                  <input className="" onChange={() => handleChange(tag)} type="radio" id={tag.id.toString()} name={tag.category} value={tag.id} />
                  <label className="capitalize" htmlFor={tag.id.toString()}>{tag.name}</label>                                  
                </li>
              )
            })}
          </ul>
        </div>
        <button type="submit" className="block mx-auto font-bold py-2 px-4 rounded-full border-gray-700 border-2 mt-8 hover:text-gray-500 active:text-white hover:bg-gray-200 active:bg-gray-400 active:border-gray-200">
              Voir les résultats
        </button>
      </form>
      </div>
  );
}







