const privateRoom = (socket, io) => {
    socket.on("invite-private-room", async (data) => {
        try {
            const { from, to, players } = data;
            const sockets = await io.fetchSockets();
            for (const socket of sockets) {
                if (socket.username === to) {
                    io.to(socket.id).emit("invite-private-room", { from, players });
                    break;
                }
            }
        } catch (error) {
            console.log(error);
        }
    });

    socket.on("kick-user-private-room", async (data) => {
        try {
            const { roomName, player } = data;
            io.to(roomName).emit("kick-private-room", { player });
        } catch (error) {
            console.log(error);
        }
    });

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
            const { roomName } = data;

            socket.host = false;

            io.in(roomName).socketsLeave([roomName]);

            console.log(roomName, "deleted a private room!");
        } catch (error) {
            console.log(error);
        }
    });

    socket.on("join-private-room", (data) => {
        try {
            const { roomName, ...player } = data;

            socket.join(roomName);

            socket.host = false;
            socket.room = roomName;

            socket.to(roomName).emit("user-join-private-room", { player });

            console.log(socket.username, "join", roomName);
        } catch (error) {
            console.log(error);
        }
    });

    socket.on("leave-private-room", (data) => {
        try {
            const { roomName, ...player } = data;

            socket.leave(roomName);

            socket.to(roomName).emit("user-leave-private-room", { player });

            console.log(socket.id, "leave", roomName);
        } catch (error) {
            console.log(error);
        }
    });
};

module.exports = privateRoom;
