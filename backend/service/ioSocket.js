const socketIO = require("socket.io");
const contants = require("../constant/constant");
const handleEvent = require(".");
const Queue = require("./queqe");
const User = require("../models/user.model");

module.exports = (server) => {
    const io = socketIO(server, {
        cors: {
            origin: contants.CLIENT_API,
            method: ["GET", "POST"],
            credentials: true,
        },
    });
    const queue = new Queue();

    io.on("connection", (socket) => {
        console.log("A client connected with id ", socket.id);

        handleEvent(socket, io, queue);

        socket.on("disconnect", async () => {
            queue.delete(socket.id);
            console.log(socket.username, "is offline!");
            await User.findOneAndUpdate({ username: socket.username }, { $set: { isOnline: false } });
            io.emit("offline", { username: socket.username });
            io.to(socket.room).emit("user-disconnect", { username: socket.username });
            console.log(`A client with id ${socket.id} disconnected`);
        });
    });
};
