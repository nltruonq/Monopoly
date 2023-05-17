const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const db=require("./configs/mongoDB")
const corsConfig=require("./configs/cors")
const corsMiddleware=require("./middlewares/corsMiddleware")
db.connect()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsConfig));
app.use(cookieParser());
app.use(corsMiddleware)


require("./routes/index")(app);

app.get("/", (req, res, next) => {
    res.status(200).json({ message: "ok" });
});

app.listen(process.env.PORT || 8000, () => {
    console.log("Server is running");
});
