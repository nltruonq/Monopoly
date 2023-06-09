const constants = require("../constant/constant");

const allowedOrigins = [constants.CLIENT_API, process.env.CLIENT_URL];

const corsConfig = {
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    exposedHeaders: "Authorization",
    credentials: true,
};

module.exports = corsConfig;
