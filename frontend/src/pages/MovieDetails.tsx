import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails, getMovieCredits } from '../services/movieService';
import StarRating from '../components/StarRating';

interface Movie {
    id: number;
    title: string;
    tagLine: string;
    genres: [];
    poster_path: string;
    backdrop_path: string;
    overview: string;
    year: string;
    vote: number;
}

interface genre {
    id: number;
    name: string;
}
interface GenreListProps {
    genres: genre[];
}

interface Credits {
    cast: [];
    crew: [];
}

interface Cast {
    id: number;
    name: string;
    profile_path: string;
    character: string;
}
interface CastListProps {
    cast: Cast[];
}

interface Crew {
    id: number;
    name: string;
    profile_path: string;
    job: string;
}
interface CrewListProps {
    crew: Crew[];
}

const MovieDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [movie, setMovie] = useState<Movie | null>(null);
    const [credits, setCredits] = useState<Credits | null>(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            if (id) {
                const movieDetails = await getMovieDetails(parseInt(id));
                setMovie(movieDetails);
                const movieCredits = await getMovieCredits(parseInt(id));
                setCredits(movieCredits);
            }
        };
        fetchMovieDetails();
    }, [id]);

    if (!movie) return <div>Loading...</div>;

    // Genre List Prop
    const GenreList: React.FC<GenreListProps> = ({ genres }) => {
        const genreNames = genres.map((genre) => genre.name).join(', ');

        return (
            <div className="genre-list">
                <strong>Genre: </strong> {genreNames}
            </div>
        );
    };

    // Cast List Prop
    const CastList: React.FC<CastListProps> = ({ cast }) => {
        return (
            <div className="cast-list row">
                {cast.map((member) => (
                    <div key={member.id} className="col-md-6 cast-member mb-20">
                        <div className='cast-profile-img' style={{
                            backgroundImage: `url(${member.profile_path
                                    ? `https://image.tmdb.org/t/p/w500${member.profile_path}`
                                    : `../../profile-placeholder.jpg`
                                })`
                        }}
                        ></div>

                        <p><strong>{member.name}</strong> <br />as {member.character}</p>
                    </div>
                ))}
            </div>
        );
    };

    // Crew List Prop
    const CrewList: React.FC<CrewListProps> = ({ crew }) => {
        return (
            <div className="cast-list row">
                {crew.map((member) => (
                    <div key={member.id} className="col-md-6 cast-member mb-20">
                        <div className='cast-profile-img' style={{
                            backgroundImage: `url(${member.profile_path
                                    ? `https://image.tmdb.org/t/p/w500${member.profile_path}`
                                    : `../../profile-placeholder.jpg`
                                })`
                        }}
                        ></div>

                        <p><strong>{member.name}</strong> <br /> {member.job}</p>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div>
            {/* Movie Backdrop as page background */}
            <div className='movie_BG' style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`
            }}
            ></div>

            <div className="container mt-100">
                <div className="row">
                    <div className="col-md-4">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={`${movie.title} poster`}
                            className="img-fluid movie-poster"
                            onError={(e) => {
                                e.currentTarget.src = '../../movie-placeholder.png';
                                e.currentTarget.alt = 'Poster not available';
                            }}
                        />
                    </div>
                    <div className="col-md-8 pt-50">
                        <h1 className='m0'>{movie.title}</h1>
                        <h4 className='mb-20'>{movie.tagLine}</h4>
                        <p className='movie-overview'>{movie.overview}</p>
                        <p className='movie-release'><strong>Release Year: </strong>{new Date(movie.year).getFullYear()}</p>
                        <StarRating rating={movie.vote / 2} />
                        <GenreList genres={movie.genres} />

                        <ul className="nav nav-pills">
                            <li className="nav-item">
                                <a className="nav-link active" data-bs-toggle="pill" href="#Cast">Cast</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-bs-toggle="pill" href="#Crew">Crew</a>
                            </li>
                        </ul>
                        <div className="tab-content">
                            <div className="tab-pane active" id="Cast">
                                <CastList cast={credits?.cast ?? []} />
                            </div>
                            <div className="tab-pane fade" id="Crew">
                                <CrewList crew={credits?.crew ?? []} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;