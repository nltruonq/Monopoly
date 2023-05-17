const mongoose = require("mongoose");

async function connect(){ 
    mongoose
    .connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("mongoose connected");
    })
    .catch(() => {
        console.log("mongosee connection failed");
    }); 
}

module.exports={connect}