"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSocket = void 0;
const setupSocket = (io) => {
    io.on("connection", (socket) => {
        console.log("A user connected");
        socket.on("joinRoom", (room) => {
            socket.join(room);
            console.log(`User joined room: ${room}`);
        });
        socket.on("message", (message) => {
            io.to(message.room).emit("message", {
                content: message.content,
                username: message.username,
            });
            console.log(`Message sent to room ${message.room}: ${message.content} from ${message.username}`);
        });
        socket.on("disconnect", () => {
            console.log("User disconnected");
        });
    });
};
exports.setupSocket = setupSocket;
