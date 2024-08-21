import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchTopRatedMovies } from '../store/movieSlice';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import StarRating from '../components/StarRating';

const TopRated: React.FC = () => {
  const dispatch = useAppDispatch();
  const { topRatedMovies, status, error } = useAppSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchTopRatedMovies());
  }, [dispatch]);

  interface Movie {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
    year: string;
    vote: number;
  }

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  return (
    <div className='container mt-100'>
      <h1>Top Rated Movies</h1>
      {Array.isArray(topRatedMovies) ? (
        <div className="row">
          {topRatedMovies.map((movie: Movie) => (
            <div className="col-sm-6 col-md-4 col-lg-2">
              <Link to={`/movie/${movie.id}`}>
                <div className="card" key={movie.id}>
                  <img
                    className='card-img-top'
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={`${movie.title} poster`}
                    width="200"
                    onError={(e) => {
                      e.currentTarget.src = '../../movie-placeholder.png';
                      e.currentTarget.alt = 'Poster not available';
                    }}
                  />
                  <div className="card-body">
                    <h5 className="card-title" title={movie.title}>{movie.title}</h5>
                    <p className="card-text">{new Date(movie.year).getFullYear()}</p>
                    <StarRating rating={movie.vote / 2} />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>No movies available</p>
      )}
    </div>
  );
};

export default TopRated;