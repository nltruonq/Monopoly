// di chuyển xong
const moveEvent = (socket) => {
  
  socket.on("moved", (data) => {
    try {
      socket.nsp.in(data.gameRoom).emit("moved-result", data);
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("world-tour",data=>{
    try {
      const {gameRoom}= data
      socket.nsp.in(gameRoom).emit("world-tour-result",{})
    } catch (error) {
      console.log(error)
    }
  })

  socket.on("select-world-tour",data=>{
    try {
      const {gameRoom,index} = data
      socket.nsp.in(gameRoom).emit("select-world-tour-result",{index})
    } catch (error) {
      console.log(error)
    }
  })

  socket.on("finish-world-tour",data=>{
    try {
      const {gameRoom,turnOfUser,possition}= data
      socket.nsp.in(gameRoom).emit("moved-result",{turnOfUser,possition})
    } catch (error) {
      console.log(error)
    }
  })

};



module.exports = moveEvent;
