import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPopularMovies, getTopRatedMovies, getSearchMovies } from '../services/movieService';

export const fetchPopularMovies = createAsyncThunk(
  'movies/fetchPopular',
  async () => {
    const response = await getPopularMovies();
    return response;
  }
);

export const fetchTopRatedMovies = createAsyncThunk(
  'movies/fetchTopRated',
  async () => {
    const response = await getTopRatedMovies();
    return response;
  }
);

export const fetchSearchMovies = createAsyncThunk(
  '/search/',
  async (query: string) => {
    const response = await getSearchMovies(query);
    return response;
  }
);

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    popularMovies: [],
    topRatedMovies: [],
    searchResults: [],
    status: 'idle',
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.popularMovies = action.payload;
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error?.message || 'Something went wrong';
      })
      .addCase(fetchTopRatedMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTopRatedMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.topRatedMovies = action.payload;
      })
      .addCase(fetchTopRatedMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error?.message || 'Something went wrong';
      })
      .addCase(fetchSearchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSearchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.searchResults = action.payload;
      })
      .addCase(fetchSearchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error?.message || 'Something went wrong';
      });
  },
});

export default movieSlice.reducer;