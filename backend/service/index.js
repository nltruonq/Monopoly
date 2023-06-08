const event = (socket, io, queue) => {
    require("./events/room.event")(socket, io, queue);
    require("./events/roll.event")(socket, io);
    require("./events/buyHouse.event")(socket);
    require("./events/turn.event")(socket, io);
    require("./events/move.event")(socket);

    // user event
    require("./userEvents/online.event")(socket, io);
    require("./userEvents/privateRoom.event")(socket, io);
};

module.exports = event;
