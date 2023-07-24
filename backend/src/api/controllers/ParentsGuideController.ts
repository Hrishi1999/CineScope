/**
@Author: Hrishi Patel <hrishi.patel@dal.ca>
*/
import { Request, Response } from "express";
import {
  createGuide,
  deleteGuideById,
  getGuidesByMovieId,
  GuideData,
  updateGuide,
} from "../models/ParentsGuide";

const ParentsGuideController = {
  async getParentsGuide(req: Request, res: Response) {
    const id = req.params.movieId;
    try {
      const guides = await getGuidesByMovieId(id);
      res.json(guides);
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ message: err.message ?? err });
    }
  },

  async createParentsGuide(req: Request, res: Response) {
    const { movieId, comment, severity, category, userId } = req.body;
    try {
      const guide = await createGuide(
        movieId,
        comment,
        severity,
        category,
        userId
      );
      res.json(guide);
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ message: err.message ?? err });
    }
  },

  async deleteParentsGuide(req: Request, res: Response) {
    const id = req.params.guideId;
    try {
      const guide = await deleteGuideById(id);
      res.json(guide);
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ message: err.message ?? err });
    }
  },

  async updateParentsGuide(req: Request, res: Response) {
    const id = req.params.guideId;
    const { movieId, comment, severity, category, userId, _id } = req.body;
    try {
      const guide = await updateGuide({
        id,
        movieId,
        comment,
        severity,
        category,
        userId,
      } as GuideData);
      res.json(guide);
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ message: err.message ?? err });
    }
  },
};

export default ParentsGuideController;
