const Queue = require("../queqe");

let queue= new Queue()
const roomEvent = (socket,io) => {

    // chờ ghép phòng
    socket.on("waitting",()=>{
      queue.enqueue(socket.id)
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
    })

    // xử lý khi hủy ghép phòng
    //=> xóa node khỏi queue
    // socket.on("cancle")....

    // khi ghép phòng đã xong
    socket.on('join-room', (gameRoom) => {
      console.log(socket.id," join room")
      socket.join(gameRoom)   
      const room = io.sockets.adapter.rooms.get(gameRoom);
      const numSockets = room ? room.size : 0;;
      
      const arr= Array.from(room)
      socket.nsp.in(gameRoom).emit("room-size",
          {
            size:numSockets,
            index:arr.indexOf(socket.id),
            socket:socket.id
          })
    });

    socket.on("leaveRoom",(data)=>{
      console.log(socket.id," leave room")
      socket.leave("123")
    })
};
  
module.exports = roomEvent;