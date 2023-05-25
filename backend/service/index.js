const event=(socket,io)=>{
    require("./events/room.event")(socket,io)
    require("./events/roll.event")(socket,io) 
    require("./events/buyHouse.event")(socket)
    require("./events/turn.event")(socket,io)  
}

module.exports= event