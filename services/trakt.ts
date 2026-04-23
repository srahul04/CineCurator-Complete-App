import axios from 'axios';

const TRAKT_CLIENT_ID = process.env.EXPO_PUBLIC_TRAKT_CLIENT_ID;
const BASE_URL = 'https://api.trakt.tv';

const traktApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'trakt-api-version': '2',
    'trakt-api-key': TRAKT_CLIENT_ID,
  },
});

export const getTrendingMovies = async () => {
  try {
    const response = await traktApi.get('/movies/trending', {
      params: { extended: 'full', limit: 12 }
    });
    
    const results = await Promise.all(response.data.map(async (item: any) => {
      const movie = item.movie;
      let posterUrl = null;
      try {
        const imgRes = await axios.get(`https://api.tvmaze.com/singlesearch/shows?q=${encodeURIComponent(movie.title)}`);
        if (imgRes.data?.image?.original) posterUrl = imgRes.data.image.original;
      } catch (e) {}

      if (!posterUrl) return null;

      // Intelligent Category Mapping for Filters
      let category = 'All Films';
      const year = movie.year || 2024;
      const ratingNum = parseFloat(movie.rating || 0);
      const mainGenre = movie.genres ? movie.genres[0].toLowerCase() : '';

      if (ratingNum > 8.0 && (mainGenre === 'action' || mainGenre === 'adventure' || mainGenre === 'sci-fi')) {
        category = 'IMAX';
      } else if (year === 2024 || year === 2025) {
        category = 'Premiere';
      } else if (mainGenre === 'drama' || mainGenre === 'documentary') {
        category = 'Indie';
      }

      return {
        id: movie.ids.trakt.toString(),
        title: movie.title,
        rating: movie.rating ? movie.rating.toFixed(1) : '8.5',
        genre: movie.genres ? movie.genres[0].toUpperCase() : 'ACTION',
        duration: `${movie.runtime || 120}m`,
        category: category,
        posterUrl: posterUrl,
        description: movie.overview,
      };
    }));
    return results.filter(m => m !== null) as any[];
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};

export const getPopularMovies = async () => {
  try {
    const response = await traktApi.get('/movies/popular', {
      params: {
        extended: 'full',
        limit: 10
      }
    });
    return response.data.map((m: any) => ({
      id: m.ids.trakt.toString(),
      title: m.title,
      posterUrl: `https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=400&auto=format&fit=crop`,
      rating: m.rating ? m.rating.toFixed(1) : '8.0',
    }));
  } catch (error) {
    console.error('Error fetching popular movies from Trakt:', error);
    return [];
  }
};

export const getAnticipatedMovies = async () => {
  try {
    const response = await traktApi.get('/movies/anticipated', {
      params: { extended: 'full', limit: 8 }
    });
    const results = await Promise.all(response.data.map(async (item: any) => {
      const movie = item.movie;
      let posterUrl = null;
      try {
        const imgRes = await axios.get(`https://api.tvmaze.com/singlesearch/shows?q=${encodeURIComponent(movie.title)}`);
        if (imgRes.data?.image?.original) posterUrl = imgRes.data.image.original;
      } catch (e) {}
      if (!posterUrl) return null;
      return {
        id: movie.ids.trakt.toString(),
        title: movie.title,
        posterUrl: posterUrl,
        releaseDate: movie.year || '2025',
      };
    }));
    return results.filter(m => m !== null) as any[];
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};

export default traktApi;
