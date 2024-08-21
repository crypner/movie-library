import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class MovieService {
    constructor(
        private httpService: HttpService,
        private configService: ConfigService
    ) {}

  private apiKey = this.configService.get<string>('TMDB_API_KEY');
  private baseUrl = this.configService.get<string>('TMDB_BASE_URL');

  getPopularMovies(): Observable<any> {
    return this.httpService
      .get(`${this.baseUrl}/movie/popular?api_key=${this.apiKey}`)
      .pipe(
        map((response) => response.data.results.map((movie: any) => ({
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            backdrop_path: movie.backdrop_path,
            overview: movie.overview,
            year: movie.release_date,
            vote: movie.vote_average
          })))
      );
  }
  getTopRatedMovies(): Observable<any> {
    return this.httpService
      .get(`${this.baseUrl}/movie/top_rated?api_key=${this.apiKey}`)
      .pipe(
        map((response) => response.data.results.map((movie: any) => ({
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            backdrop_path: movie.backdrop_path,
            overview: movie.overview,
            year: movie.release_date,
            vote: movie.vote_average
          })))
      );
  }

  getSearchMovies(query: string): Observable<any> {
    return this.httpService
      .get(`${this.baseUrl}/search/movie?query=${query}&api_key=${this.apiKey}`)
      .pipe(        
        map((response) => response.data.results.map((movie: any) => ({
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            backdrop_path: movie.backdrop_path,
            overview: movie.overview,
            year: movie.release_date,
            vote: movie.vote_average
          })))
      );
  }

  getMovieDetails(id: number): Observable<any> {
    return this.httpService
      .get(`${this.baseUrl}/movie/${id}?api_key=${this.apiKey}`)
      .pipe(
        map((response) => {
          const movie = response.data;
          return {
            id: movie.id,
            title: movie.title,
            tagLine: movie.tagline,
            genres: movie.genres,
            poster_path: movie.poster_path,
            backdrop_path: movie.backdrop_path,
            overview: movie.overview,
            year: movie.release_date,
            vote: movie.vote_average
          };
        })
      );
  }

  getMovieCredits(id: number): Observable<any> {
    return this.httpService
      .get(`${this.baseUrl}/movie/${id}/credits?api_key=${this.apiKey}`)
      .pipe(
        map((response) => {
          const movie = response.data;
          return {
            id: movie.id,
            cast: movie.cast,
            crew: movie.crew
          };
        })
      );
  }
  
}