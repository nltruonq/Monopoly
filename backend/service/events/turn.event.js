const turnEvent=(socket,io)=>{
    // mua nhà
    socket.on("turn",(data)=>{
        const {gameRoom}=data
        const room = io.sockets.adapter.rooms.get(gameRoom);
        const roomArr=Array?.from(room)
        const user= roomArr.indexOf(socket.id)
        ===roomArr.length-1
        ?0
        :roomArr.indexOf(socket.id)+1
        socket.nsp.in(gameRoom).emit("turn-result",{gameRoom,user})
    })    
    

}

module.exports =turnEvent
