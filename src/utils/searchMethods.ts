/* eslint-disable import/prefer-default-export */
import axiosInstance from '@/src/utils/axios';
import { Artwork } from '@/src/@types';

export const getRandomArtworks = async () => {
  try {
    const response = await axiosInstance.get('/artworks/random');
    return response.data as Artwork[];
  } catch (error) {
    return error;
  }
};
