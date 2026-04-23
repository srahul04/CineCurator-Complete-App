import axios from 'axios';

const TMDB_API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
    language: 'en-US',
  },
});

export const getNowPlayingMovies = async () => {
  try {
    const response = await tmdbApi.get('/movie/now_playing', {
      params: { region: 'IN' } // Focus on India
    });
    return response.data.results.map((m: any) => ({
      id: m.id.toString(),
      title: m.title,
      rating: m.vote_average.toFixed(1),
      genre: 'Action', // Simplified, can be mapped from genre_ids
      duration: '2h 15m', // Mocked as TMDB now_playing doesn't return duration directly
      category: m.adult ? 'A' : 'UA',
      posterUrl: `${IMAGE_BASE_URL}${m.poster_path}`,
      posterColor: '#A01D2A',
      isNew: true,
    }));
  } catch (error) {
    console.error('Error fetching now playing movies:', error);
    return [];
  }
};

export const getUpcomingMovies = async () => {
  try {
    const response = await tmdbApi.get('/movie/upcoming', {
      params: { region: 'IN' }
    });
    return response.data.results.map((m: any) => ({
      id: m.id.toString(),
      title: m.title,
      posterUrl: `${IMAGE_BASE_URL}${m.poster_path}`,
      releaseDate: m.release_date,
    }));
  } catch (error) {
    console.error('Error fetching upcoming movies:', error);
    return [];
  }
};

export const getMovieTrailer = async (movieId: string) => {
  try {
    const response = await tmdbApi.get(`/movie/${movieId}/videos`);
    const trailer = response.data.results.find((v: any) => v.type === 'Trailer' && v.site === 'YouTube');
    return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
  } catch (error) {
    console.error('Error fetching movie trailer:', error);
    return null;
  }
};

export const getMovieReviews = async (movieId: string) => {
  try {
    const response = await tmdbApi.get(`/movie/${movieId}/reviews`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
};

export default tmdbApi;
