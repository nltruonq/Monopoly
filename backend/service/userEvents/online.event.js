const User = require("../../models/user.model");

const onlineEvent = (socket, io) => {
    socket.on("online", async (data) => {
        try {
            const { username } = data;
            await User.findOneAndUpdate({ username: username }, { $set: { isOnline: true } });
            socket.username = username;
            io.emit("online", { username });
            console.log(username, "is online!");
        } catch (error) {
            console.log(error);
        }
    });
};

module.exports = onlineEvent;
