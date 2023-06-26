const User = require("../models/user.model");
const { uploadAvatarUser } = require("../service/cloudinary");

const userController = {
    // route /list/:username
    getListByUserName: async (req, res) => {
        try {
            let listPropose = [];
            const username = req.params.username;

            // //tìm chính xác
            // const user = await User.findOne({ username }); // username: ?
            // if (user) {
            //     listPropose.push(user);
            // }

            // đề xuất gần đúng
            const list = await User.find({ username: { $regex: username } }).limit(10);
            listPropose = listPropose.concat(list);
            return res.json({
                status: 200,
                listPropose,
            });
        } catch (error) {
            console.log(error);
        }
    },

    changeAvatar: async (req, res) => {
        try {
            const { username, image } = req.body;
            const url = await uploadAvatarUser(image);
            const user = await User.findOneAndUpdate({ username }, { $set: { avatar: url } }, { returnDocument: "after" }).select(
                "-password"
            );
            return res.status(200).json({ message: "Success!", user });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Failed!" });
        }
    },

    updateGoldandRuby: async (req, res) => {
        try {
            const { username, gold, ruby } = req.body;
            const user = await User.findOneAndUpdate({ username }, { $set: { gold: gold, ruby: ruby } }, { new: true }).select("-password");
            return res.status(200).json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Failed!" });
        }
    },

    getOne: async (req, res) => {
        try {
            const { username } = req.params;
            const user = await User.findOne({ username }).select("-password");
            return res.status(200).json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Failed!" });
        }
    },
};

module.exports = userController;
