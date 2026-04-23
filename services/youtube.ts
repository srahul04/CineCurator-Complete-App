import axios from 'axios';

const YOUTUBE_API_KEY = process.env.EXPO_PUBLIC_YOUTUBE_API_KEY;

export const getMovieTrailer = async (movieTitle: string) => {
  try {
    const query = encodeURIComponent(`${movieTitle} official trailer`);
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${YOUTUBE_API_KEY}&maxResults=1&type=video`
    );

    if (response.data.items && response.data.items.length > 0) {
      const videoId = response.data.items[0].id.videoId;
      return `https://www.youtube.com/watch?v=${videoId}`;
    }
    return null;
  } catch (error) {
    console.error('Error searching YouTube trailer:', error);
    return null;
  }
};
