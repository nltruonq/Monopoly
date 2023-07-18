const express = require("express");
const cors = require("cors");
const http = require("http");
const cookieParser = require("cookie-parser");

const socket = require("./service/ioSocket");
const db = require("./configs/mongoDB");
const corsConfig = require("./configs/cors");
const corsMiddleware = require("./middlewares/corsMiddleware");

require("dotenv").config();

const app = express();
const server = http.createServer(app);
socket(server);
db.connect();

app.use(cors(corsConfig));
app.use(corsMiddleware);

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

require("./routes/index")(app);

app.get("/", (req, res, next) => {
    res.status(200).json({ message: "ok" });
});

server.listen(process.env.PORT || 8000, () => {
    console.log("Server is running in Port", process.env.PORT);
});
