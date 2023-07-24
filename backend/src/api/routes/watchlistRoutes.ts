/**
 * @author Harsh Kamleshbhai Shah <shah.harsh@dal.ca>
 */
import { Router } from "express";
import watchlistController from "../controllers/WatchlistController";

const watchlistRoute = (): Router => {
  const router = Router();

  router
    .route("/")
    .post(watchlistController.addToWatchlist)
    .put(watchlistController.updateWatchlist)
    .delete(watchlistController.removeFromWatchlist);

  router
    .route("/:userId/")
    .get(watchlistController.readWatchlist)
    .delete(watchlistController.clearWatchlist);
    
  return router;
};

export default watchlistRoute;
