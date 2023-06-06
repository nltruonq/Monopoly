const route=require("express").Router();

const FriendRequestController = require("../controllers/friendRequestController");

route.post("/send", FriendRequestController.sendFriendRequest);
route.post("/accept",FriendRequestController.acceptFriendRequest)
route.get("/get/:username",FriendRequestController.getFriendRequests)
route.post("/refuse",FriendRequestController.refuseFriendRequest)

module.exports = route