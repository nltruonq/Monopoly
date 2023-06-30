
const roomEvent = (socket,io,queue) => {

    // chờ ghép phòng
    socket.on("waitting",()=>{
      try {
        queue.enqueue(socket.id)
        // queue.printQueue()
        if(queue.length===4){
          let gameRoom
          for(let i=0;i<4;i++){
              let socketId=queue.dequeue()
              
              // gameRoom lấy từ socketId của người chơi đầu tiên 
              if (i===0) {
                gameRoom=socketId
              }
              io.to(socketId).emit("waitting-result",{gameRoom})
            }
        }  
      } catch (error) {
        console.log(error)
      }
    })

    // xử lý khi hủy ghép phòng
    //=> xóa node khỏi queue
    socket.on("cancle",()=>{
      try {
        queue.delete(socket.id)
      } catch (error) {
        console.log(error)
      }
    })

    // khi ghép phòng đã xong
    socket.on('join-room', (gameRoom) => {
      try {
        socket.join(gameRoom)   
        const room = io.sockets.adapter.rooms.get(gameRoom);
        const numSockets = room ? room.size : 0;
        
        const arr= Array.from(room)
        console.log(room)
        socket.nsp.in(gameRoom).emit("room-size",
            {
              size:numSockets,
              index:arr.indexOf(socket.id),
              socket:socket.id,
              arr
            })     
      } catch (error) {
        console.log(error)
      }
    });

    socket.on("leave-room",(data)=>{
      try {
        socket.leave(data.gameRoom)
      } catch (error) {
        console.log(error)        
      }
    })
};
  
module.exports = roomEvent;