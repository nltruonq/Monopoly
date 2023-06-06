// di chuyển xong
const moveEvent=(socket)=>{
  try {
    socket.on("moved",(data)=>{
      socket.nsp.in(data.gameRoom).emit("moved-result",data)
    })   
    
  } catch (error) {
    console.log(error)
  }
}

module.exports=moveEvent