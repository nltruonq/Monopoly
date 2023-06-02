const User = require("../models/user.model")

const userController = {

    //gửi lời mời kết bạn

    //route  /:username
    sendFriendRequest: async () => {
        try {
            // get username (người muốn kết bạn)

            // lưu vào database

            // username mình  ---- username th kia (tạo bảng lời mời kết bạn) ->model

            // .save()
        } catch (error) {
            console.log(error)
        }
    },

    // xem danh sách lời mời
    // route /list/:username
    getListByUserName: async (req,res) => {
        try {
            let listPropose= []
            const username = req.params.username

            //tìm chính xác
            const user = await User.findOne({ username }) // username: ?
            if (user) {
                listPropose.push(user)
            }

            // đề xuất gần đúng
            const list = await User.find({username:{$regex:username}}).limit(10)
            listPropose=listPropose.concat(list)
            return res.json({
                status:200,
                listPropose
            })

        } catch (error) {
            console.log(error)
        }
    },

    // chấp nhận
    // post {username mình, username ngkia }
    acceptRequest: async () => {
        try {
            // lưu database bạn bè
        } catch (error) {

        }
    }

    //từ chối
    // xóa khỏi database lời mời

}

module.exports= userController
