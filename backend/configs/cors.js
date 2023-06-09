const constants =require("../constant/constant")

const corsConfig={
    origin: [constants.CLIENT_API, process.env.CLIENT_URL],
    exposedHeaders: 'Authorization',
    credentials: true,
}

module.exports=corsConfig