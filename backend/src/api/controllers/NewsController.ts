import { Request, Response } from "express";
import { createNews, getNews, deleteNews, getNewsById } from "../models/News";

const NewsController = {
  async getNews(req: Request, res: Response) {
    try {
      const news = await getNews();
      res.json(news);
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ message: err.message ?? err });
    }
  },

  async getNewsById(req: Request, res: Response) {
    const id = req.params.newsId;
    try {
      const news = await getNewsById(id);
      res.json(news);
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ message: err.message ?? err });
    }
  },

  async fetchAllNews(req: Request, res: Response) {
    try {
      const movies = await getNews();
      res.status(200).json(movies);
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ message: err.message ?? err });
    }
  },

  async createNews(req: Request, res: Response) {
    const { newsTitle, posterLink, fullArticle, year, movieName, genre } = req.body;

    try {
      const news = await createNews(newsTitle, posterLink, fullArticle, year, movieName, genre);
      res.json(news);
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ message: err.message ?? err });
    }
  },

  async updateNews(req: Request, res: Response) {
    const { newsTitle, posterLink, fullArticle, year, movieName, genre } = req.body;
    try {
      const news = await createNews(newsTitle, posterLink, fullArticle, year, movieName, genre);
      res.json(news);
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ message: err.message ?? err });
    }
  },

  async deleteNews(req: Request, res: Response) {
    const id = req.params.NewsId;
    try {
      const news = await deleteNews(id);
      res.json(news);
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ message: err.message ?? err });
    }
  },
};

export default NewsController;
