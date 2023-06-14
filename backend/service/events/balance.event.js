const balance = (socket)=>{
    socket.on("change-balance",(data)=>{
        const {gameRoom,amount,user,type}=data
        socket.nsp.in(gameRoom).emit("change-balance-result",{amount,user,type})
    })
}

module.exports= balance