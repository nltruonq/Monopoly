const socketIO = require("socket.io");
const contants = require("../constant/constant");
const handleEvent = require(".");


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

    handleEvent(socket,io)
    
    socket.on('disconnect', () => {
        console.log(`A client with id ${socket.id} disconnected`);
    });
})
};
