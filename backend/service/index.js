const event=(socket,io,queue)=>{
    require("./events/room.event")(socket,io,queue)
    require("./events/roll.event")(socket,io) 
    require("./events/buyHouse.event")(socket)
    require("./events/turn.event")(socket,io)  
    require("./events/move.event")(socket)
}

module.exports= event