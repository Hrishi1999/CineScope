import mongoose from "mongoose";

const Schema = mongoose.Schema;

const reviews = new Schema({
  userName: String,
  movie: String,
  rating: Number,
  review: String,
  review_date: Date,
  rating_date: Date,
  flag: Boolean,
  movieId: String,
});

const Reviews = mongoose.model("Reviews", reviews);

/*retrieves rating from database*/
export async function getRating(movie: any) {
  const movies = await Reviews.find({ movie: movie });
  return movies;
}

/*retrieves review from database*/
export async function getReview(movie: any) {
  const movies = await Reviews.find({ movie: movie });
  return movies;
}

export async function getReviewByUserName(userName: any) {
  const movies = await Reviews.find({ userName: userName });
  return movies;
}

/*adds rating to database*/
export async function addRating(
  movie: any,
  userName: any,
  rating: any,
  movieId: any
) {
  const currentDate = Date.now();
  const filter = { userName: userName, movie: movie };
  const update = {
    rating: rating,
    rating_date: currentDate,
    flag: false,
    movieId: movieId,
  };

  //https://mongoosejs.com/docs/api/model.html#model_Model.findOneAndUpdate
  //https://www.appsloveworld.com/nodejs/100/3/mongoose-create-document-if-not-exists-otherwise-update-return-document-in-e
  const options = { upsert: true, new: true, setDefaultsOnInsert: true };

  const addedRating = await Reviews.findOneAndUpdate(filter, update, options);

  return addedRating;
}

/* to add or update a review to database*/
export async function addReview(
  movie: any,
  userName: any,
  review: any,
  movieId: any
) {
  const currentDate = Date.now();
  const filter = { userName: userName, movie: movie };
  const update = {
    review: review,
    review_date: currentDate,
    flag: false,
    movieId: movieId,
  };

  const options = { upsert: true, new: true, setDefaultsOnInsert: true };
  const addedReview = await Reviews.findOneAndUpdate(filter, update, options);

  return addedReview;
}

export async function getReviewCountForMovie(movieId: any){
  // const ratings = await Reviews.count({})
  const ratings = await Reviews.aggregate([
    { $match: { movieId: movieId } },
  { $group: { _id: "$movieId", avg_rating: { $avg: "$rating" } } },
  { $project: { _id: 0, movieId: "$_id", rating: { $round: ["$avg_rating", 1] } } }
  ])
  return ratings;
}

export async function getMostRatedMovies(){
  const movies = Reviews.aggregate([
    { $group: { _id: "$movieId", rating: { $avg: "$rating" } } },
    { $sort: { rating: -1 } },
    { $limit: 7 }
  ])
  return movies;
}

export async function getCountOfRateForMovie(movieId: any){
  const movies = Reviews.countDocuments({ movieId:  movieId})
  return movies;
}

export default mongoose.model("Reviews", reviews);
