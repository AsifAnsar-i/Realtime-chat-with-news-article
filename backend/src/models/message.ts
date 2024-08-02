import mongoose from "mongoose";

export interface MessageType {
  username: string;
  content: string;
}

const messageSchema = new mongoose.Schema({
  username: String,
  content: String,
});

const Message = mongoose.model<MessageType>("Message", messageSchema);

export default Message;
