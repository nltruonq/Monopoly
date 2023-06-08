const onlineEvent = (socket, io) => {
    socket.on("online", (data) => {
        try {
            const { username } = data;
            io.emit("online", { username });
            console.log(username, "is online!");
        } catch (error) {
            console.log(error);
        }
    });
    socket.on("offline", (data) => {
        try {
            const { username } = data;
            console.log(username, "is offline!");
            io.emit("offline", { username });
        } catch (error) {
            console.log(error);
        }
    });
};

module.exports = onlineEvent;
