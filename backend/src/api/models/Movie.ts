/**
 * @author Ketul Patel - <ketul.patel@dal.ca>
 */

import mongoose from "mongoose";
import Reviews from "./Reviews";

const Schema = mongoose.Schema;

const movie = new Schema({
  title: String,
  released_date: Date,
  director: String,
  genres: [String],
  time_in_minutes: String,
  plot: String,
  cast: [String],
  images: [String],
  thumbnail: String,
  poster: String,
  trailor: String,
});

const Movie = mongoose.model("Movie", movie);

export function fetchLastestMovies() {
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 2);
  const movies = Movie.find({ released_date: { $gte: oneMonthAgo } })
    .sort("-released_date")
    .limit(7);
  return movies;
}

export async function createMovie(
  title: String,
  released_date: Date,
  director: String,
  genres: [String],
  time_in_minutes: String,
  plot: String,
  cast: [String],
  images: [String],
  thumbnail: String,
  poster: String,
  trailor: String
) {
  if (
    title === undefined ||
    released_date === undefined ||
    director === undefined ||
    genres === undefined ||
    time_in_minutes === undefined ||
    plot === undefined ||
    cast === undefined ||
    images === undefined ||
    thumbnail === undefined ||
    poster === undefined ||
    trailor == undefined
  ) {
    throw "Missing parameters";
  }
  console.log(trailor);

  const newMovie = new Movie({
    title: title,
    released_date: released_date,
    director: director,
    genres: genres,
    time_in_minutes: time_in_minutes,
    plot: plot,
    cast: cast,
    images: images,
    thumbnail: thumbnail,
    poster: poster,
    trailor: trailor,
  });
  try {
    newMovie.save();
  } catch (err) {
    throw err;
  }
}

export function searchMovie(keyword: any) {
  try {
    if (keyword == "" || keyword == null) {
      const movies = Movie.find();
      return movies;
    } else {
      const regex = new RegExp(keyword, "i");
      const movies = Movie.find({ title: { $regex: regex } });
      return movies;
    }
  } catch (err) {
    throw err;
  }
}


export function fetchRecommendedMovieForUser(genres: any) {
  try {
    const recommendedMovies = Movie.find({ genres: { $in: genres} })
    return recommendedMovies;
  } catch (err) {
    throw err;
  }
}

export function fetchRecommendedMovieForMovieDetailsPage(genres: any, movieId: any) {
  try {
    const recommendedMovies = Movie.find({ genres: { $in: genres},  _id: { $ne: movieId } })
    return recommendedMovies;
  } catch (err) {
    throw err;
  }
}

export function filterMovie(ratings: any, genre: any, year: any) {
  try {
    let filteredMovies: any = {};
    const query = {} as any;

    if (year) {
      const isoYear = new Date(`${year}-01-01T00:00:00.000Z`).toISOString();
      query.released_date = {
        $gte: isoYear,
        $lt: `${parseInt(year) + 1}-01-01T00:00:00.000Z`,
      };
    }
    if (genre) {
      query.genres = { $all: genre };
    }
    if (ratings) {
    }
    filteredMovies = Movie.find(query);
    return filteredMovies;
  } catch (err) {
    throw err;
  }
}

export function fetchAllMovies() {
  try {
    const movies = Movie.find();
    return movies;
  } catch (err) {
    throw err;
  }
}

export function fetchMovieById(movieId: any) {
  try {
    const movie = Movie.findById(movieId);
    return movie;
  } catch (err) {
    throw err;
  }
}

export function deleterMovieById(movieId: any) {
  try {
    const message = Movie.findByIdAndDelete(movieId);
    return message;
  } catch (err) {
    throw err;
  }
}

export async function updateMovie(movie: any) {
  if (movie._id === undefined) {
    throw "You forgot to pass movieId.";
  }

  const updatedMovie = await Movie.find({ _id: movie._id }).updateOne(movie);

  if (updatedMovie.matchedCount === 0) {
    throw "No movie not found";
  } else if (updatedMovie.modifiedCount > 0) {
    return { message: "Movie updated" };
  }

  return { message: "No changes to movie." };
}

export async function ratingFilter(list: any) {
  if (list.length == 0) {
    return null;
  } else {
    const movies = Reviews.find({ movieId: { $in: list } });
    console.log(movies);
    return movies;
  }
}
export default mongoose.model("Movie", movie);
