const turnEvent = (socket,io) => {
    socket.on("roll",(data)=>{
        const room = io.sockets.adapter.rooms.get(data.gameRoom);
        const roomArr=Array?.from(room)
        const user= roomArr.indexOf(socket.id)

        diceOne=Math.floor(Math.random() * 6 + 1)
        diceTwo=Math.floor(Math.random() * 6 + 1)
        console.log(user,"aa")
        socket.nsp.in(data.gameRoom).emit("roll-result",{
            user,
            socket:socket.id,
            diceOne,
            diceTwo
        })
    })


  };
  
module.exports = turnEvent;