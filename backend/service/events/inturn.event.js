const turnEvent = (socket,io) => {
    socket.on("roll",(data)=>{
        const room = io.sockets.adapter.rooms.get(data.gameRoom);
        const roomArr=Array?.from(room)
        const user= roomArr.indexOf(socket.id)

        diceOne=Math.floor(Math.random() * 6 + 1)
        diceTwo=Math.floor(Math.random() * 6 + 1)

        socket.nsp.in(data.gameRoom).emit("roll-result",{
            user,
            socket:socket.id,
            diceOne,
            diceTwo
        })
    })

    // người chơi khác mua nhà xong
    socket.on("bought",(data)=>{
        //...
        
        socket.nsp.in(data.gameRoom).emit("bought-result"),{
            socket:socket.id
        }
    })
  };
  
module.exports = turnEvent;