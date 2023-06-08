const router = require("express").Router();
const FriendController = require("../controllers/friendController")

// view list friends
router.get("/list-friends/:username", FriendController.getFriend);

//only use for test 
router.post("/create",FriendController.createFriend)



module.exports = router;
