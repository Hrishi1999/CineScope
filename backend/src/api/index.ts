import express, { Request, Response, Router } from "express";
import UserRoute from "./routes/userRoute";
import movieRoute from "./routes/movieRoute";
import newsRoute from "./routes/newsRoute";
import reviewsRoute from "./routes/reviewsRoute";
import watchlistRoute from "./routes/watchlistRoutes";
import ParentsGuideRoute from "./routes/ParentsGuideRoute";
const router: Router = express.Router();

router.get("/", (_req: Request, res: Response) => {
  res.json({
    message: "Base route",
  });
});

router.use("/users", UserRoute());
router.use("/movie", movieRoute());
router.use("/news", newsRoute());
router.use("/reviews", reviewsRoute());
router.use("/watchlist", watchlistRoute());
router.use("/parents-guide", ParentsGuideRoute());

export default router;
