const buyEvent = (socket) => {
    // mua nhà
    socket.on("bought", (data) => {
        try {
            const { gameRoom, select,price } = data
            socket.nsp.in(gameRoom).emit("bought-result", { gameRoom, select,price })
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
            const {gameRoom,price,owner}=data
            socket.nsp.in(gameRoom).emit("re-bought-result",{
              price,
              owner  
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
}

module.exports = buyEvent
