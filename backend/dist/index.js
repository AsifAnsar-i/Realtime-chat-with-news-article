"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const users_1 = __importDefault(require("./routes/users"));
const auth_1 = __importDefault(require("./routes/auth"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const socket_1 = require("./socket");
const message_1 = __importDefault(require("./routes/message"));
const news_1 = __importDefault(require("./routes/news"));
const path_1 = __importDefault(require("path"));
mongoose_1.default.connect(process.env.MONGODB_CONNECTION_STRING);
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        credentials: true,
    },
});
(0, socket_1.setupSocket)(io);
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
app.use(express_1.default.static(path_1.default.join(__dirname, "../../ui/dist")));
app.use("/api/auth", auth_1.default);
app.use("/api/users", users_1.default);
app.use("/api/message", message_1.default);
app.use("/api/news", news_1.default);
server.listen(7000, () => {
    console.log(`Server running, on port ${7000}`);
});
