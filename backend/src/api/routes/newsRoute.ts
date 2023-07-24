import { Router } from "express";
import NewsController from "../controllers/NewsController";

const newsRouter = (): Router => {
  const router = Router();

  router.route("/").post(NewsController.createNews);
  router.route("/latestNews/").get(NewsController.getNews);

  router
    .route("/:newsId")
    .get(NewsController.getNewsById)
    .put(NewsController.updateNews)
    .delete(NewsController.deleteNews);

  return router;
};

export default newsRouter;