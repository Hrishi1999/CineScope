/**
 * @author Ketul Patel - <ketul.patel@dal.ca>
 */

import { Router } from "express";
import movieController from "../controllers/MovieController";

const movieRoute = (): Router => {
  const router = Router();

  router.route("/").post(movieController.createMovie);

  router.route("/latest/").get(movieController.fetchLastestMovies);
  router.route("/search/").post(movieController.filterMovie);
  router.route("/all/").get(movieController.fetchAllMovies);
  router.route("/rated/").get(movieController.fetchMostRatedMovies);
  router.route("/recommended/").post(movieController.fetchRecommendedMovieForUser);
  router.route("/recommended/:movieId").post(movieController.fetchRecommendedMovieForMovieDetailsPage);

  router
    .route("/:movieId")
    .get(movieController.fetchMovieById)
    .put(movieController.updateMovieById)
    .delete(movieController.deleterMovieById);

  return router;
};

export default movieRoute;