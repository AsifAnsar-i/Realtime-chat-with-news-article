import { Server, Socket } from "socket.io";

export const setupSocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("A user connected");

    socket.on("joinRoom", (room: string) => {
      socket.join(room);
      console.log(`User joined room: ${room}`);
    });

    socket.on(
      "message",
      (message: { room: string; content: string; username: string }) => {
        io.to(message.room).emit("message", {
          content: message.content,
          username: message.username,
        });
        console.log(
          `Message sent to room ${message.room}: ${message.content} from ${message.username}`
        );
      }
    );

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};
