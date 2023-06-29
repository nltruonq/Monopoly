const buyEvent = (socket) => {
    // mua nhà
    socket.on("bought", (data) => {
        try {
            const { gameRoom, select,price,inuse } = data
            socket.nsp.in(gameRoom).emit("bought-result", { gameRoom, select,price,inuse })
        } catch (error) {
            console.log(error)            
        }
    })

    socket.on("upgrade",(data)=>{
        try {
            const { gameRoom, select,price,inuse } = data
            socket.nsp.in(gameRoom).emit("upgrade-result", { gameRoom, select,price,inuse })
        } catch (error) {
            console.log(error)
        }
    })


    socket.on("pay",(data)=>{
        try {
            const {gameRoom,price,owner}=data
            socket.nsp.in(gameRoom).emit("pay-result",{
              price,
              owner  
            })
        } catch (error) {
            console.log(error)
        }
    })

    socket.on("re-bought",(data)=>{
        try {
            const {gameRoom,price,owner,inuse,currentLevel}=data
            console.log(data)
            socket.nsp.in(gameRoom).emit("re-bought-result",{
              price,
              owner,
              inuse,
              currentLevel  
            })
        } catch (error) {
            console.log(error)            
        }
    })
    

    // người chơi khác mua nhà xong
    socket.on("close", (data) => {
        //...
        try {
            socket.nsp.in(data.gameRoom).emit("close-result"), {
                socket: socket.id
            }
        } catch (error) {
            console.log(error)            
        }
    })

    // phá hủy nhà
    socket.on("destroy-house",data=>{
        try {
            socket.nsp.in(data.gameRoom).emit("destroy-house-result",{
                user:data.turnOfUser
            })
        } catch (error) {
            console.log(error)
        }
    })
    socket.on("destroy-select",data=>{
        try {
            socket.nsp.in(data.gameRoom).emit("destroy-select-result",{
                index:data.index
            })
        } catch (error) {
            console.log(error)
        }
    })
    socket.on("reset-destroy",data=>{
        try {
            socket.nsp.in(data.gameRoom).emit("reset-destroy-result",{})
        } catch (error) {
            console.log(error)
        }
    })

    //
    socket.on("seagame",data=>{
        try {
            socket.nsp.in(data.gameRoom).emit("seagame-result")
        } catch (error) {
            console.log(error)
        }
    })

    socket.on("host-seagame",data=>{
        try {
            const {gameRoom,index} = data
            socket.nsp.in(gameRoom).emit("host-seagame-result",{index})
        } catch (error) {
            console.log(error)
        }
    })

    socket.on("sell-house",data=>{
        try {
            const {gameRoom,affortToPay,owner} = data
            socket.nsp.in(gameRoom).emit("sell-house-result",{affortToPay,owner})
        } catch (error) {
            console.log(error)
        }
    })

    socket.on("select-sell",data=>{
        try {
            const {gameRoom,index}=data
            socket.nsp.in(gameRoom).emit("select-sell-result",{index})
        } catch (error) {
            console.log(error)
        }
    })

    socket.on("sell-click",data=>{
        try {
            const { gameRoom,user,owner,amountUser,amountOwner,listSell}=data
            socket.nsp.in(gameRoom).emit("sell-click-result",{user,owner,amountOwner,amountUser,listSell})
        } catch (error) {
            console.log(error)
        }
    })

    socket.on("sell-reset",data=>{
        try {
            const {gameRoom} = data
            socket.nsp.in(gameRoom).emit("sell-reset-result")
        } catch (error) {
            console.log(error)
        }
    })
}

module.exports = buyEvent
