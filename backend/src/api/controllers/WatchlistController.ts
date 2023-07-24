/**
 * @author Harsh Kamleshbhai Shah <shah.harsh@dal.ca>
 */
import { NextFunction, Request, Response } from "express";
import {
  addMovieToWatchlist,
  clearAllMoviesFromWatchlist,
  getWatchlist,
  removeMovieFromWatchlist,
  updateStatusOfMovieInWatchlist,
} from "../models/Watchlist";

// In a controller for maintaining a Watchlist for a user in Node,  you would typically need the following functions:

// getWatchlist: This function would retrieve the current watchlist for a given user.
const readWatchlist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.userId;
  try {
    const watchlist = await getWatchlist(userId);
    res.json(watchlist);
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ message: err.message ?? err });
  }
};

// addToWatchlist: This function would add a new item to the user's watchlist.
const addToWatchlist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, movieId, status } = req.body;
  try {
    const watchlist = await addMovieToWatchlist(userId, movieId, status);
    res.json(watchlist);
  } catch (err: any) {
    console.log(err);
    res.status(500).json({
      message: err.message ?? err,
    });
  }
};

// removeFromWatchlist: This function would remove an item from the user's watchlist.
const removeFromWatchlist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, movieId } = req.body;
  try {
    const watchlist = await removeMovieFromWatchlist(userId, movieId);
    res.json(watchlist);
  } catch (err: any) {
    console.log(err);
    res.status(500).json({
      message: err.message ?? err,
    });
  }
};

// clearWatchlist: This function would remove all items from the user's watchlist.
const clearWatchlist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.userId;
  try {
    const watchlist = await clearAllMoviesFromWatchlist(userId);
    res.json(watchlist);
  } catch (err: any) {
    console.log(err);
    res.status(500).json({
      message: err.message ?? err,
    });
  }
};

// updateWatchlist: This function would allow the user to update the details of an item in their watchlist, such as changing its name or description.
const updateWatchlist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, movieId, status } = req.body;
  try {
    const last_update = new Date();
    const watchlist = await updateStatusOfMovieInWatchlist({
      userId,
      movieId,
      status,
      last_update,
    });
    res.json(watchlist);
  } catch (err: any) {
    console.log(err);
    res.status(500).json({
      message: err.message ?? err,
    });
  }
};

// getWatchlistItem: This function would retrieve a specific item from the user's watchlist based on its ID.
const getWatchlistItem = (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

// getWatchlistCount: This function would return the total number of items in the user's watchlist.
const getWatchlistCount = (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

// These functions would allow you to create a basic Watchlist management system in your Node controller. You would also need to implement appropriate database queries or other storage mechanisms to save and retrieve the user's watchlist data
export default {
  readWatchlist,
  addToWatchlist,
  updateWatchlist,
  clearWatchlist,
  removeFromWatchlist,
};
