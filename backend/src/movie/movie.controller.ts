// src/movie/movie.controller.ts
import { Controller, Get, Query, Param } from '@nestjs/common';
import { MovieService } from './movie.service';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get('popular')
  getPopularMovies() {
    return this.movieService.getPopularMovies();
  }

  @Get('top_rated')
  getTopRatedMovies() {
    return this.movieService.getTopRatedMovies();
  }

  @Get('search')
  getSearchMovies(@Query('query') query: string) {
    return this.movieService.getSearchMovies(query);
  }

  @Get(':id')
  getMovieDetails(@Param('id') id: number) {
    return this.movieService.getMovieDetails(id);
  }

  @Get(':id/credits')
  getMovieCredits(@Param('id') id: number) {
    return this.movieService.getMovieCredits(id);
  }

}