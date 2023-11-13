/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable array-callback-return */

'use client';

import {
  useState, useEffect, useCallback,
} from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axiosInstance from '@/src/utils/axios';
import { addTagToSearchParams, removeParam, moveObjectToEnd } from '@/src/utils/searchMethods';
import { Tag } from '@/src/@types';

export default function Filter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tagStyle, setTagStyle] = useState<Tag[]>([]);
  const [tagSupport, setTagSupport] = useState<Tag[]>([]);
  const [tagType, setTagType] = useState<Tag[]>([]);
  const [typeValue, setTypeValue] = useState('');
  const [supportValue, setSupportValue] = useState('');
  const [styleValue, setStyleValue] = useState('');

  const setSelectsValue = useCallback(() => {
    const typeId = searchParams.get('type');
    const supportId = searchParams.get('support');
    const styleId = searchParams.get('style');
    const type = tagType.find((tag) => tag.id === Number(typeId))?.name;
    const support = tagSupport.find((tag) => tag.id === Number(supportId))?.name;
    const style = tagStyle.find((tag) => tag.id === Number(styleId))?.name;
    setTypeValue(type || '');
    setSupportValue(support || '');
    setStyleValue(style || '');
  }, [searchParams, tagType, tagSupport, tagStyle]);

  useEffect(() => {
    const getTag = () => {
      const newTagStyle: Tag[] = [];
      const newTagSupport: Tag[] = [];
      const newTagType: Tag[] = [];
      axiosInstance.get<Tag[]>('/tags')
        .then((res) => {
          res.data.map((tag: Tag) => {
            if (tag.category === 'style') {
              newTagStyle.push(tag);
            }
            if (tag.category === 'support') {
              newTagSupport.push(tag);
            }
            if (tag.category === 'type') {
              newTagType.push(tag);
            }
          });
          moveObjectToEnd(newTagStyle, 'name', 'autre');
          moveObjectToEnd(newTagSupport, 'name', 'autre');
          moveObjectToEnd(newTagType, 'name', 'autre');
          setTagStyle(newTagStyle);
          setTagSupport(newTagSupport);
          setTagType(newTagType);
        }).catch((err) => {
          throw err;
        });
    };
    getTag();
    setSelectsValue();
  }, [setSelectsValue]);

  const handleChange = (selectValue: string) => {
    if (selectValue.includes('empty')) {
      removeParam(selectValue, searchParams, router);
    } else {
      const tag = tagStyle.find((tag) => tag.name === selectValue)
      || tagSupport.find((tag) => tag.name === selectValue)
      || tagType.find((tag) => tag.name === selectValue);
      addTagToSearchParams(tag!, searchParams, router);
    }
    setSelectsValue();
  };

  return (
    <div className="flex justify-between md:justify-center md:gap-8 mb-2 w-[95vw]">
      <div className="flex flex-col md:gap-1">
        <label htmlFor="type" className="font-semibold text-sm">Type</label>
        <select name="type" id="type" value={typeValue} onChange={(e) => handleChange(e.target.value)} className="p-1 text-center text-sm">
          <option value="emptyType">indifférent</option>
          {tagType.map((tag: Tag) => (
            <option key={tag.id} className="" value={tag.name}>
              {tag.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col md:gap-1">
        <label htmlFor="support" className="font-semibold text-sm">Support</label>
        <select name="support" id="support" value={supportValue} onChange={(e) => handleChange(e.target.value)} className="p-1 text-center text-sm">
          <option value="emptySupport">indifférent</option>
          {tagSupport.map((tag: Tag) => (
            <option key={tag.id} className="" value={tag.name}>
              {tag.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col md:gap-1">
        <label htmlFor="style" className="font-semibold text-sm">Style</label>
        <select name="style" id="style" value={styleValue} onChange={(e) => handleChange(e.target.value)} className="p-1 text-center text-sm">
          <option value="emptyStyle">indifférent</option>
          {tagStyle.map((tag: Tag) => (
            <option key={tag.id} className="" value={tag.name}>
              {tag.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
