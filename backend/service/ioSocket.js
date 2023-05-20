const socketIO = require("socket.io");
const contants = require("../constant/constant");

module.exports = (server) => {
  const io = socketIO(server,{
    cors: {
        origin: contants.CLIENT_API,
        method: ['GET', 'POST'],
        credentials: true,
    },      
  });


  io.on('connection',(socket)=>{
    
    console.log('A client connected with id ',socket.id);

    socket.on('joinRoom',async(room)=>{
        console.log(socket.id ," join room ",room)
        socket.join(room)
    })
    socket.on('leaveRoom',async(key)=>{
        console.log(socket.id," leave room ", key)
        socket.leave(key)
    })

    socket.on('disconnect', () => {
        console.log(`A client with id ${socket.id} disconnected`);
    });
})
};