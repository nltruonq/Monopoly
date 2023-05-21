const event=(socket,io)=>{
    require("./events/move.event")(socket)
    require("./events/room.event")(socket,io)
    require("./events/inturn.event")(socket,io)   
}

module.exports= event