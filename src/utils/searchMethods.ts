/* eslint-disable import/prefer-default-export */
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { ReadonlyURLSearchParams } from 'next/navigation';
import { Tag } from '@/src/@types';

export const addTagToSearchParams = (tag: Tag, searchParams: ReadonlyURLSearchParams, router: AppRouterInstance) => {
  if (!searchParams.has(`${tag.category}`)) {
    console.log(searchParams.has(`${tag.category}`));
    router.push(`?${searchParams.toString() && `${searchParams.toString()}&`}${tag.category}=${tag.id}`);
  }
  if (searchParams.has(`${tag.category}`) && searchParams.get(`${tag.category}`) !== tag.id.toString()) {
    console.log(searchParams.has(`${tag.category}`));
    router.push(`?${searchParams.toString().replace(`${tag.category}=${searchParams.get(`${tag.category}`)}`, `${tag.category}=${tag.id}`)}`);
  }
};
