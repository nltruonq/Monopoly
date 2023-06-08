const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            trim: true,
            required: [true, "Name must be required"],
        },
        email: {
            type: String,
            unique: true,
            trim: true,
            required: [true, "Email must be required"],
        },
        password: {
            type: String,
            trim: true,
            required: [true, "Password must be required"],
            minlength: [6, "Password must be at least 6 charaters"],
        },
        isOnline: {
            type: Boolean,
            default: false,
        },
        gold: {
            type: Number,
            default: 1000,
        },
        ruby: {
            type: Number,
            default: 10,
        },
    },
    { timestamps: true }
);

userSchema.methods.isRightPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {}
};

const User = mongoose.model("User", userSchema);

module.exports = User;
