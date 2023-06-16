const balance = (socket)=>{
    socket.on("change-balance",(data)=>{
        const {gameRoom,amount,user,type}=data
        socket.nsp.in(gameRoom).emit("change-balance-result",{amount,user,type})
    })
    socket.on("start",(data)=>{
        const {gameRoom,amount,user}=data
        socket.nsp.in(gameRoom).emit("start-result",{amount,user})
    })
}

module.exports= balance