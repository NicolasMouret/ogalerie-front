/* eslint-disable import/prefer-default-export */
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { ReadonlyURLSearchParams } from 'next/navigation';
import { Tag } from '@/src/@types';

export const addTagToSearchParams = (tag: Tag, searchParams: ReadonlyURLSearchParams, router: AppRouterInstance) => {
  if (!searchParams.has(`${tag.category}`)) {
    router.push(`?${searchParams.toString() && `${searchParams.toString()}&`}${tag.category}=${tag.id}`);
  }
  if (searchParams.has(`${tag.category}`) && searchParams.get(`${tag.category}`) !== tag.id.toString()) {
    router.push(`?${searchParams.toString().replace(`${tag.category}=${searchParams.get(`${tag.category}`)}`, `${tag.category}=${tag.id}`)}`);
  }
};

export const removeTagFromSearchParams = (category: string, searchParams: ReadonlyURLSearchParams, router: AppRouterInstance) => {
  if (searchParams.has(`${category}`)) {
    const newSearchParams = new URLSearchParams(searchParams.toString().replace(`${category}=${searchParams.get(`${category}`)}`, ''));
    router.push(`?${newSearchParams.toString()}`);
  }
};

export const removeParam = (selectValue: string, searchParams: ReadonlyURLSearchParams, router: AppRouterInstance) => {
  switch (selectValue) {
    case 'emptyType':
      removeTagFromSearchParams('type', searchParams, router);
      break;
    case 'emptySupport':
      removeTagFromSearchParams('support', searchParams, router);
      break;
    case 'emptyStyle':
      removeTagFromSearchParams('style', searchParams, router);
      break;
    default:
      break;
  }
};

export const moveObjectToEnd = (array: Tag[], attribute: string, value: string) => {
  // Find the index of the object with the specified attribute value
  const index = array.findIndex((tag) => tag[attribute as keyof Tag] === value);

  // If the object is found, move it to the end of the array
  if (index !== -1) {
    const objectToMove = array.splice(index, 1)[0]; // Remove the object from its current position
    array.push(objectToMove); // Add the object to the end of the array
  }
};
