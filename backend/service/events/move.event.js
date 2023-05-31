// di chuyển xong
const moveEvent=(socket)=>{
  socket.on("moved",(data)=>{
    socket.nsp.in(data.gameRoom).emit("moved-result",data)
  })   
}

module.exports=moveEvent