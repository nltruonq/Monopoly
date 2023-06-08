const mongoose = require("mongoose")
const onlineSchema= mongoose.Schema({
    username: {
        type:String,
        required:true,
        unique:true
    },
    socketId:{
        type:String,
        required:true,
        unique:true,
    }
})

module.exports = mongoose.model('Online',onlineSchema)