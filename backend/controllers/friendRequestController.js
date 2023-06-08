const FriendRequest = require("../models/friendRequest.model")
const Friend = require("../models/friend.model")
const User = require("../models/user.model")

const FriendRequestController = {

    // Lấy danh sách lời mời kết bạn
    getFriendRequests: async (req, res) => {
        try {
            const { username } = req.params
            const friendRequests = await FriendRequest.find({ receiver:username})

            for(let i = 0 ; i<friendRequests.length;i++){
                const user =  await User.findOne({username: friendRequests[i].sender})
                friendRequests[i] = {...friendRequests[i]._doc,user}
            }

            res.status(200).json(friendRequests);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Gửi lời mời kết bạn
    sendFriendRequest: async (req, res) => {
        try {
            const { sender, receiver } = req.body
            const friendRequest = new FriendRequest({ sender, receiver })
            await friendRequest.save()
            return res.json({
                status: 200,
                message: "Gửi thành công"
            })
        } catch (error) {
            console.log(error)
        }
    },

    // Chấp nhận lời mời kết bạn
    acceptFriendRequest: async (req, res) => {
        try {
            const { username_1, username_2 } = req.body
            const createFriend = new Friend({ username_1, username_2 })
            await createFriend.save()
            await FriendRequest.deleteOne({ sender: username_1, receiver: username_2 })
            return res.json({
                status: 200,
                message: "Đã chấp nhận"
            })

        } catch (error) {
            console.log(error)
        }
    },

    // Từ chối lời mời kết bạn
    refuseFriendRequest: async (req, res) => {
        try {
            const { sender, receiver } = req.body
            await FriendRequest.deleteOne({ sender, receiver })
            return res.json({
                status: 200,
                message: "Đã xóa lời mời"
            })

        } catch (error) {
            console.log(error)
        }
    }



}

module.exports = FriendRequestController