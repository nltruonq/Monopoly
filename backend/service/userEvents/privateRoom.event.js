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

    socket.on("invite-world", (data) => {
        try {
            const { from, players } = data;
            io.emit("invite-world", { from, players, time: new Date(Date.now()) });
        } catch (err) {
            console.log(err);
        }
    });

    socket.on("sync-player-private-room", async (data) => {
        try {
            const { roomName, players } = data;
            io.to(roomName).emit("sync-player-private-room", { players });
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

            io.to(roomName).emit("host-delete-room");
            io.in(roomName).socketsLeave([roomName]);

            // const room = io.sockets.adapter.rooms.get(roomName);
            // console.log(room);

            console.log(roomName, "deleted a private room!");
        } catch (error) {
            console.log(error);
        }
    });

    socket.on("join-private-room", async (data) => {
        try {
            const { roomName, ...player } = data;
            const room = io.sockets.adapter.rooms.get(roomName);
            if (room?.size === 4) {
                io.to(socket.id).emit("full-player-private-room");
                return;
            }

            const sockets = await io.fetchSockets();
            for (const s of sockets) {
                if (s.username === roomName) {
                    if (s.play) {
                        io.to(socket.id).emit("played-private-room");
                        return;
                    }
                    break;
                }
            }

            socket.join(roomName);

            socket.host = false;
            socket.room = roomName;

            io.to(socket.id).emit("can-join-private-room");
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

    socket.on("play-private-room", (data) => {
        try {
            const { roomName,players } = data;
            console.log(roomName);

            // random gameRoom
            let room = roomName + (Math.floor(Math.random() * 9999) + 1000)
            // console.log(roomName,"aa")

            socket.nsp.in(roomName).emit("play-private-room-result", { gameRoom: room, players,host:roomName});
            socket.play = true;
            // socket.to(roomName).emit("play-private-room-result",{gameRoom:roomName})
        } catch (error) {
            console.log(error);
        }
    });
};

module.exports = privateRoom;
