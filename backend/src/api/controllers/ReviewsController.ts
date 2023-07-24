import { Request, Response } from "express";
import {
  addRating,
  addReview,
  getRating,
  getReview,
  getReviewByUserName,
  getReviewCountForMovie,
  getMostRatedMovies,
  getCountOfRateForMovie,
} from "../models/Reviews";

/* controller function to retrieve ratings by calculating average*/
const ReviewsController = {
  async getRatings(req: Request, res: Response) {
    const movie = req.params.movieID;
    try {
      const message = await getRating(movie);
      const sum = message.reduce((accumulator, currentValue: any) => {
        return accumulator + (currentValue["rating"] ?? 0);
      }, 0);
      const average = sum / message.length;
      res.status(200).json(average);
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ message: err.message ?? err });
    }
  },

  /* to get added reviews*/
  async getReviews(req: Request, res: Response) {
    const movie = req.params.movieID;
    try {
      const message = await getReview(movie);
      res.status(200).json(message);
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ message: err.message ?? err });
    }
  },

  async getReviewsByUser(req: Request, res: Response) {
    const userName = req.params.userName;
    try {
      const message = await getReviewByUserName(userName);
      res.status(200).json(message);
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ message: err.message ?? err });
    }
  },

  /* to add rating for a movie*/
  async addRatings(req: Request, res: Response) {
    const movie = req.params.movieID;
    const userName = req.body.userName;
    const rating = req.body.rating;
    const movieId = req.body.movieId;
    try {
      const message = await addRating(movie, userName, rating, movieId);
      res.status(200).json(message);
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ message: err.message ?? err });
    }
  },

  /* to add reviews*/
  async addReviews(req: Request, res: Response) {
    const movie = req.params.movieID;
    const userName = req.body.userName;
    const review = req.body.review;
    const movieId = req.body.movieId;
    try {
      const message = await addReview(movie, userName, review, movieId);
      res.status(200).json(message);
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ message: err.message ?? err });
    }
  },

  async getReviewCountForMovie(req: Request, res: Response) {
    const movieId = req.body.movieId;
    try {
      const response = await getReviewCountForMovie(movieId);
      res.status(200).json(response);
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ message: err.message ?? err });
    }
  },

  async getMostRatedMovies(req: Request, res: Response) {
    try {
      const response = await getMostRatedMovies();
      res.status(200).json(response);
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ message: err.message ?? err });
    }
  },

  async getCountOfRateForMovie(req: Request, res: Response) {
    const movieId = req.body.movieId;
    try {
      const response = await getCountOfRateForMovie(movieId);
      res.status(200).json(response);
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ message: err.message ?? err });
    }
  },
};

export default ReviewsController;
