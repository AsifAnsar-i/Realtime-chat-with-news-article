import express, { Request, Response } from "express";
import NewsArticleModel from "../models/news";

const router = express.Router();

router.post("/", (req: Request, res: Response) => {
  try {
    let news = req.body;
    news = new NewsArticleModel(news);
    news.save();
    return res.status(200).send({ message: "news saved" });
  } catch (error) {
    return res.status(500).send({ message: "Something went wrong" });
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const news = await NewsArticleModel.find();
    return res.status(200).send(news);
  } catch (error) {
    return res.status(500).send({ message: "Something went wrong" });
  }
});

export default router;
