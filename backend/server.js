const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser");

mongoose
    .connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("mongoose connected");
    })
    .catch(() => {
        console.log("mongosee connection failed");
    });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

require("./routes/index")(app);

app.get("/", (req, res, next) => {
    res.status(200).json({ message: "ok" });
});

app.listen(process.env.PORT || 8000, () => {
    console.log("Server is running");
});
