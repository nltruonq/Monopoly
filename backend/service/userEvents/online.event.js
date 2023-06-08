const Online = require('../../models/online.model')
const Friend = require("../../models/friend.model")

const onlineEvent = (socket, io) => {

    // list -> {username, socketid} -> luu db (nhnug nguoi online)
    // khi online -> them db 
    // emit  ?bb + ?online 
    socket.on("online",async (data) => {
        try {
            const { username } = data;
            const online = new Online({username,socketId: socket.id})
            await online.save()

            //b1 lấy danh sách bạn bè
            //b2 kiểm tra ai online
            //b3 emit tới tất cả friend <- socket.id
            //b4 emit tới client danh sách friend online


            //b1
            const listFriends = await Friend.find({$or:[
                {
                    username_1:username
                }
                ,
                {
                    username_2:username
                }
            ]})
            const listFriendsOnline=[]

            // b2
            for(let i=0;i<listFriends.length;i++){
                if(listFriends[i].username_1 === username){
                    const friendOnline = await Online.findOne({
                        username:listFriends[i].username_2
                    })

                    if(friendOnline){
                        listFriendsOnline.push(friendOnline)
                    }
                }
                else {
                    const friendOnline = await Online.findOne({
                        username:listFriends[i].username_1
                    })
                    if(friendOnline){
                        listFriendsOnline.push(friendOnline)
                    }
                }
            }   

            //b3
            for(let i=0;i<listFriendsOnline.length;i++){
                io.to(listFriendsOnline[i].socketId).emit("online-friend", { username });
            }

            //b4
            io.to(socket.id).emit("online-client",{list:listFriendsOnline})

        } catch (error) {
            console.log(error);
        }
    });
};

module.exports = onlineEvent;
