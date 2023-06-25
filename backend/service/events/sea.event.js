const seaEvents=(socket)=>{
    socket.on("buy-sea",data=>{
        try {
            const { gameRoom, price,inuse } = data
            socket.nsp.in(gameRoom).emit("bought-result", { gameRoom, price,inuse })
        } catch (error) {
            console.log(error)            
        }
    })    
}

module.exports = seaEvents