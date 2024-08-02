import mongoose, { Schema, Document } from "mongoose";

export interface NewsSource {
  id: string | null;
  name: string;
}

export interface NewsArticle extends Document {
  source: NewsSource;
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

const newsSourceSchema = new Schema<NewsSource>({
  id: { type: String, default: null },
  name: { type: String, required: true },
});

const newsArticleSchema = new Schema<NewsArticle>({
  source: { type: newsSourceSchema, required: true },
  author: { type: String, default: null },
  title: { type: String, required: true },
  description: { type: String, default: null },
  url: { type: String, required: true },
  urlToImage: { type: String, default: null },
  publishedAt: { type: String, required: true },
  content: { type: String, default: null },
});

const NewsArticleModel = mongoose.model<NewsArticle>(
  "NewsArticle",
  newsArticleSchema
);

export default NewsArticleModel;
