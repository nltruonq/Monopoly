const roomEvent = (socket,io) => {
    socket.on('joinRoom', (gameRoom) => {
      console.log(socket.id," join room")
      socket.join(gameRoom)   
      const room = io.sockets.adapter.rooms.get(gameRoom);
      const numSockets = room ? room.size : 0;;
      
      const arr= Array.from(room)
      socket.nsp.in(gameRoom).emit("room-size",
          {
            size:numSockets,
            index:arr.indexOf(socket.id),
            socket:socket.id
          })
    });

    socket.on("leaveRoom",(data)=>{
      console.log(socket.id," leave room")
      socket.leave("123")
    })
  };
  
module.exports = roomEvent;