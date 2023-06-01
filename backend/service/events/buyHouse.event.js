const buyEvent = (socket) => {
    // mua nhà
    socket.on("bought", (data) => {
        const { gameRoom, select,price } = data
        socket.nsp.in(gameRoom).emit("bought-result", { gameRoom, select,price })
    })


    // người chơi khác mua nhà xong
    socket.on("close", (data) => {
        //...

        socket.nsp.in(data.gameRoom).emit("close-result"), {
            socket: socket.id
        }
    })
}

module.exports = buyEvent
