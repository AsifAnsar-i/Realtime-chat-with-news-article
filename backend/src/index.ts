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

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

setupSocket(io);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/news", newsRoutes);

server.listen(7000, () => {
  console.log(`Server running, on port ${7000}`);
});
