const User = require("../models/user.model")

const userController = {

    // route /list/:username
    getListByUserName: async (req, res) => {
        try {
            let listPropose = []
            const username = req.params.username

            //tìm chính xác
            const user = await User.findOne({ username }) // username: ?
            if (user) {
                listPropose.push(user)
            }

            // đề xuất gần đúng
            const list = await User.find({ username: { $regex: username } }).limit(10)
            listPropose = listPropose.concat(list)
            return res.json({
                status: 200,
                listPropose
            })

        } catch (error) {
            console.log(error)
        }
    },



}

module.exports = userController
