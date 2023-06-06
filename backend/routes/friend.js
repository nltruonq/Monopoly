const router = require("express").Router();
const FriendController = require("../controllers/friendController")

// view list friends
router.get("/list-friends/:username", FriendController.getFriend);


module.exports = router;
