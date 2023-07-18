const turnEvent=(socket,io)=>{
    // quản lý lượt chơi tron 1 phòng
    socket.on("turn",async (data)=>{
        try {
            const {gameRoom}=data
            const room = await io.sockets.adapter.rooms.get(gameRoom);
            const roomArr=Array?.from(room)
            const user= roomArr.indexOf(socket.id)===roomArr.length-1
            ? 0
            : roomArr.indexOf(socket.id)+1
            
            socket.nsp.in(gameRoom).emit("turn-result",{gameRoom,user})
            
        } catch (error) {
            console.log(error)
        }
    })
    socket.on("jail",data=>{
        try {
            const {gameRoom,user,turns}=data
            socket.nsp.in(gameRoom).emit("jail-count",{user,turns})
            socket.nsp.in(gameRoom).emit("jail-result",{user,turns})
        } catch (error) {
            console.log(error)
        }
    })    

    socket.on("loss",(data)=>{
        try {
            const {gameRoom,owner} = data
            socket.nsp.in(gameRoom).emit("loss-result")

            // 
            socket.nsp.in(gameRoom).emit("loss-reset",{owner})
        } catch (error) {
            console.log(error)
        }
    })

    socket.on("winner",(data)=>{
        try {
            const {gameRoom,winner} =data
            socket.nsp.in(gameRoom).emit("winner-result",{winner})
        } catch (error) {
            console.log(error)
        }
    })
}

module.exports =turnEvent
