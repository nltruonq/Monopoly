const router = require("express").Router();
const userController = require("../controllers/userController")

// search friend
router.get("/search-friend/:username", userController.getListByUserName);

module.exports = router;
