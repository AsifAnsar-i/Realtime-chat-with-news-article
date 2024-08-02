import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";
import { setupSocket } from "./socket";
import messageRoutes from "./routes/message";
import newsRoutes from "./routes/news";
import path from "path";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://realtime-chat-with-news-article.onrender.com",
    credentials: true,
  },
});

setupSocket(io);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "https://realtime-chat-with-news-article.onrender.com",
    credentials: true,
  })
);

app.use(express.static(path.join(__dirname, "../../ui/dist")));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/news", newsRoutes);

app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../ui/dist/index.html"));
});

server.listen(7000, () => {
  console.log(`Server running, on port ${7000}`);
});
