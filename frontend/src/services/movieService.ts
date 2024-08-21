import axios from 'axios';

const API_URL = 'http://localhost:8001/movies';

export const getPopularMovies = async () => {
  const response = await axios.get(`${API_URL}/popular`);
  return response.data;
};

export const getTopRatedMovies = async () => {
  const response = await axios.get(`${API_URL}/top_rated`);
  return response.data;
};

export const getSearchMovies = async (query: string) => {
  try {
    const response = await axios.get(`${API_URL}/search`, { params: { query } });
    return response.data;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

export const getMovieDetails = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching movie details for movie ID ${id}:`, error);
    throw error;
  }
};

export const getMovieCredits = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/${id}/credits`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching movie details for movie ID ${id}:`, error);
    throw error;
  }
};
