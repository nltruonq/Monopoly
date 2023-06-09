const constants =require("../constant/constant")

const corsConfig={
    origin: constants.CLIENT_API,
    exposedHeaders: 'Authorization',
    credentials: true,
}

module.exports=corsConfig