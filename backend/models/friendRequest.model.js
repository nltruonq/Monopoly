const mongoose = require("mongoose")

const friendRequestSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true,
        ref: 'User'
    },
    receiver: {
        type: String,
        required: true,
    }
}, { timestamps: true })

module.exports = mongoose.model("FriendRequest", friendRequestSchema)
