/**
 * @author Ketul Patel - <ketul.patel@dal.ca>
 */

import { Request, Response } from "express";
import { createMovie, fetchLastestMovies, searchMovie, filterMovie, updateMovie, fetchAllMovies, fetchMovieById, deleterMovieById, ratingFilter, fetchRecommendedMovieForUser, fetchRecommendedMovieForMovieDetailsPage } from "../models/Movie";
import { getMostRatedMovies } from "../models/Reviews";

const MovieController = {
  async fetchLastestMovies(req: Request, res: Response) {
    try {
      const movies = await fetchLastestMovies();
      res.status(200).json(movies);
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ message: err.message ?? err });
    }
  },

  async fetchAllMovies(req: Request, res: Response) {
    try {
      const movies = await fetchAllMovies();
      res.status(200).json(movies);
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ message: err.message ?? err });
    }
  },

  async createMovie(req: Request, res: Response) {
    const {
      title,
      released_date,
      director,
      genres,
      time_in_minutes,
      plot,
      cast,
      images,
      thumbnail,
      poster,
      trailor,
    } = req.body;
    try {
      const movie = await createMovie(
        title,
        released_date,
        director,
        genres,
        time_in_minutes,
        plot,
        cast,
        images,
        thumbnail,
        poster,
        trailor
      );
      res.status(200).json(movie);
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ message: err.message ?? err });
    }
  },

  async filterMovie(req: Request, res: Response) {
    const { keyword, ratings, genre, year } = req.body;

    if (keyword) {
      try {
        const movies = await searchMovie(keyword);
        res.status(200).json(movies);
      } catch (err: any) {
        console.log(err);
        res.status(500).json({ message: err.message ?? err });
      }
    } else {
      try {
        const movies = await filterMovie(ratings, genre, year);
        // console.log(movies);
        if(ratings)
        {
          const l = [];
          for(let i = 0; i < movies.length; i++){
            l.push(movies[i]._id.valueOf());
          }
          console.log(l);
          const filterRatings = await ratingFilter(l);
          console.log(filterRatings);
        }
        res.status(200).json(movies);
      } catch (err: any) {
        console.log(err);
        res.status(500).json({ message: err.message ?? err });
      }
    }
  },


  async fetchMovieById(req: Request, res: Response){
    const movieId = req.params.movieId;
    try{
      const movies = await fetchMovieById(movieId);
      res.status(200).json(movies);
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ message: err.message ?? err });
    }
  },

  async fetchRecommendedMovieForUser(req: Request, res: Response){
    const body = req.body;
    const genres = body.genres;
    try{
      const movies = await fetchRecommendedMovieForUser(genres);
      res.status(200).json(movies);
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ message: err.message ?? err });
    }
  },

  async fetchRecommendedMovieForMovieDetailsPage(req: Request, res: Response){
    const body = req.body;
    const genres = body.genres;
    const movieId = req.params.movieId;
    try{
      const movies = await fetchRecommendedMovieForMovieDetailsPage(genres, movieId);
      res.status(200).json(movies);
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ message: err.message ?? err });
    }
  },

  async updateMovieById(req: Request, res: Response){
    const movieId = req.params.movieId;
    const {
      _id,
      title,
      released_date,
      director,
      genres,
      time_in_minutes,
      plot,
      cast,
      images,
      thumbnail,
      poster,
      trailor,
    } = req.body;
    try{
      const movie = await updateMovie({
        _id,
        title,
        released_date,
        director,
        genres,
        time_in_minutes,
        plot,
        cast,
        images,
        thumbnail,
        poster,
        trailor,
      });
      res.status(200).json(movie);
    } catch (err: any){
      console.log(err);
      res.status(500).json({ message: err.message ?? err });
    }
  },

  async deleterMovieById(req: Request, res: Response){
    const movieId = req.params.movieId;
    try{
      const message = await deleterMovieById(movieId);
      res.status(200).json(message);
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ message: err.message ?? err });
    }
  },

  async fetchMostRatedMovies(req: Request, res: Response){
    try{
      const movies = await getMostRatedMovies();
      var mostRatedMovies = new Array();
      for( let movie = 0; movie < movies.length; movie++){
        const movieId = movies[movie]._id;
        const movieDetail = await fetchMovieById(movieId);
        mostRatedMovies.push(movieDetail);
      }
      // console.log(mostRatedMovies);
      res.status(200).json(mostRatedMovies);
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ message: err.message ?? err });
    }
  },
};

export default MovieController;
