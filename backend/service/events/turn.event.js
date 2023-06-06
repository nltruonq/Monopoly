const turnEvent=(socket,io)=>{
    // quản lý lượt chơi tron 1 phòng
    socket.on("turn",(data)=>{
        try {
            const {gameRoom}=data
            const room = io.sockets.adapter.rooms.get(gameRoom);
            const roomArr=Array?.from(room)
            const user= roomArr.indexOf(socket.id)
            ===roomArr.length-1
            ?0
            :roomArr.indexOf(socket.id)+1
            socket.nsp.in(gameRoom).emit("turn-result",{gameRoom,user})
            
        } catch (error) {
            console.log(error)
        }
    })    
}

module.exports =turnEvent
