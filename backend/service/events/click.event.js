const clickEvent = (socket,io) => {
    socket.on("roll",(data)=>{
        try {
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
            
        } catch (error) {
            console.log(error)
        }
    })

    socket.on("spin",(data)=>{
        const {gameRoom}=data
        socket.nsp.in(gameRoom).emit("spin-result")
    })


  };
  
module.exports = clickEvent;