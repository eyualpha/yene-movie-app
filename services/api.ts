export const TMDB_CONFIG = {
    BASE_URL: 'https://api.themoviedb.org/3',
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY || '',
    get headers() {
        const isV4Token = this.API_KEY.startsWith('eyJ');
        return {
            accept: 'application/json',
            ...(isV4Token ? { Authorization: `Bearer ${this.API_KEY}` } : {}),
        };
    }
}

export const fetchMovies = async ({ query}: { query: string }) => {
    if (!TMDB_CONFIG.API_KEY) {
        throw new Error('Missing TMDB API key');
    }

    const apiKeyParam = `api_key=${TMDB_CONFIG.API_KEY}`;
    const searchQuery = query.trim();

    const endpoint = searchQuery
        ? `${TMDB_CONFIG.BASE_URL}/search/movie?${apiKeyParam}&query=${encodeURIComponent(searchQuery)}&include_adult=false&language=en-US&page=1`
        : `${TMDB_CONFIG.BASE_URL}/movie/popular?${apiKeyParam}&language=en-US&page=1`;
    try {
        const response = await fetch(endpoint, {
            method: 'GET',
            headers: TMDB_CONFIG.headers
        }); 
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error;
    }
}
