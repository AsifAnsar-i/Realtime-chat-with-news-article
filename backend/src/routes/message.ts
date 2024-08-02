import express, { Request, Response } from "express";
import Message from "../models/message";

const router = express.Router();

router.post("/", (req: Request, res: Response) => {
  try {
    let user = req.body;
    user = new Message(user);
    user.save();
    return res.status(200).send({ message: "chat saved" });
  } catch (error) {
    return res.status(500).send({ message: "Something went wrong" });
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const messages = await Message.find();
    return res.status(200).send(messages);
  } catch (error) {
    return res.status(500).send({ message: "Something went wrong" });
  }
});

export default router;
