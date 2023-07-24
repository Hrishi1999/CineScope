/**
@Author: Hrishi Patel <hrishi.patel@dal.ca>
*/
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const guide = new Schema({
  movieId: String,
  comment: String,
  severity: String,
  category: String,
  userId: String,
});

export interface GuideData {
  id: String;
  movieId: String;
  comment: String;
  severity: String;
  category: String;
  userId: String;
}

const Guide = mongoose.model("ParentsGuide", guide);

export function createGuide(
  movieId: String,
  comment: String,
  severity: String,
  category: String,
  userId: String
) {
  if (
    movieId === undefined ||
    comment === undefined ||
    severity === undefined ||
    category === undefined ||
    userId === undefined
  ) {
    throw "Oi! Missing some information!";
  }

  const guide = new Guide({
    movieId: movieId,
    comment: comment,
    severity: severity,
    category: category,
    userId: userId,
  });
  return guide.save();
}

export async function getGuidesByMovieId(movieId: String) {
  if (movieId === undefined) {
    throw "Oi! You forgot to pass an id!";
  }

  const guides = await Guide.find({ movieId: movieId });
  return guides;
}

export async function deleteGuideById(guideId: any) {
  try {
    const message = await Guide.findByIdAndDelete(guideId);
    return message;
  } catch (err) {
    throw err;
  }
}

export async function updateGuide(guide: GuideData) {
  if (guide.id === undefined) {
    throw "You forgot to pass guideId.";
  }

  const updatedGuide = await Guide.findById(guide.id).updateOne(guide);

  if (updatedGuide.matchedCount === 0) {
    throw "Guide not found";
  } else {
    return updatedGuide;
  }
}

export async function getGuidesByUserId(userId: String) {
  if (userId === undefined) {
    throw "Oi! You forgot to pass an id!";
  }

  const guides = await Guide.find({ userId: userId });
  return guides;
}

export default mongoose.model("ParentsGuide", guide);
