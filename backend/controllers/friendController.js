const Friend = require("../models/friend.model");
const User = require("../models/user.model");


const FriendController = {

    // Lấy danh sách bạn bè của một người dùng
    getFriend: async (req, res) => {
        const username_1 = req.params.username;
        
        try {
            const friend = await Friend.find({
                $or:[
                    {
                        username_1
                    },
                    {
                        username_2:username_1
                    }
                ]
            })
            let list=[]
            for(let i =0; i <friend.length;i++ ){
                if(friend[i].username_1===username_1){
                    const user= await User.findOne({username:friend[i].username_2}).select("username")
                    list.push(user)
                }
                else {
                    const user= await User.findOne({username: friend[i].username_1})
                                            .select("username")
                    list.push(user)
                }
            }
            res.json(list);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch friends' });
        }
    },


}

module.exports = FriendController
