const User = require("../../models/user.model");

const onlineEvent = (socket, io) => {
    // quản lý lượt chơi tron 1 phòng
    socket.on("online", (data) => {
        try {
            const { username } = data;
            socket.emit("online", { username });
        } catch (error) {
            console.log(error);
        }
    });
};

module.exports = onlineEvent;
