const privateRoom = (socket, io) => {
    socket.on("create-private-room", (data) => {
        try {
            const { username } = data;
            //room's name is username by user created room!
            socket.join(username);

            socket.host = true;

            console.log(username, "created a private room!");
        } catch (error) {
            console.log(error);
        }
    });


    socket.on("delete-private-room", (data) => {
        try {
            const { username } = data;

            socket.host = false;

            io.in(username).socketsLeave([username]);

            console.log(username, "deleted a private room!");
        } catch (error) {
            console.log(error);
        }
    });

    socket.on("join-private-room", (data) => {
        try {
            const { roomName } = data;

            socket.join(roomName);

            socket.host = false;

            socket.to(roomName).emit("user-join-private-room");

            console.log(socket.id, "join", roomName);
        } catch (error) {
            console.log(error);
        }
    });

    socket.on("leave-private-room", (data) => {
        try {
            const { roomName } = data;

            socket.leave(roomName);

            socket.to(roomName).emit("user-leave-private-room");

            console.log(socket.id, "leave", roomName);
        } catch (error) {
            console.log(error);
        }
    });
};

module.exports = privateRoom;
