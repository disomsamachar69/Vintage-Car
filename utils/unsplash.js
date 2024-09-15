// utils/unsplash.js

import axios from 'axios';

const BASE_URL = 'https://api.unsplash.com/search/photos';

export async function fetchVintageCarPhotos(page = 10, perPage = 250) {
  const API_KEY = process.env.NEXT_PUBLIC_UNSPLASH_API_KEY;

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        query: 'classic car',
        page,
        per_page: perPage,
        client_id: API_KEY,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching photos:', error);
    return [];
  }
}
