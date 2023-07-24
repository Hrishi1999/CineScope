/**
@Author: Hrishi Patel <hrishi.patel@dal.ca>
*/
import { Router } from "express";
import ParentsGuideController from "../controllers/ParentsGuideController";

const ParentsRoute = (): Router => {
  const router = Router();

  router.route("/").post(ParentsGuideController.createParentsGuide);

  router.route("/movie/:movieId").get(ParentsGuideController.getParentsGuide);

  router
    .route("/:guideId")
    .delete(ParentsGuideController.deleteParentsGuide)
    .put(ParentsGuideController.updateParentsGuide);

  return router;
};

export default ParentsRoute;
