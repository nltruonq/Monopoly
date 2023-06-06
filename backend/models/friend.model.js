const mongoose = require('mongoose');

const FriendSchema = new mongoose.Schema({
    username_1: {
        type: String,
        ref: 'User',
        required: true
    },
    username_2: {
        type: String,
        ref: 'User',
        required: true
    },

}, { timestamps: true });

const Friend = mongoose.model('friends', FriendSchema);

module.exports = Friend