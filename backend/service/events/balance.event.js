const balance = (socket)=>{
    socket.on("change-balance",(data)=>{
        const {gameRoom,amount,user,type}=data
        socket.nsp.in(gameRoom).emit("change-balance-result",{amount,user,type})
    })
    //thay đổi nhiều user 1 lúc
    socket.on("change-balance-users",(data)=>{
        const {gameRoom,amount,user,type}=data
        socket.nsp.in(gameRoom).emit("change-balance-users-result",{amount,user,type})
    })
    //qua ô start +300
    socket.on("start",(data)=>{
        const {gameRoom,amount,user}=data
        socket.nsp.in(gameRoom).emit("start-result",{amount,user})
    })

    socket.on("pay-tax",data=>{
        const {gameRoom,amount,user}=data
        socket.nsp.in(gameRoom).emit("pay-tax-result",{amount,user})
    })

    socket.on("receive-birthday",data=>{
        const {gameRoom,amount,user}=data
        socket.nsp.in(gameRoom).emit("receive-birthday-result",{amount,user})
    })
    socket.on("pay-birthday",data=>{
        const {gameRoom,users}=data
        socket.nsp.in(gameRoom).emit("pay-birthday-result",{users})
    })

    
}

module.exports= balance