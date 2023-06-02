const router = require("express").Router();
const userController = require("../controllers/userController")

router.get("/search-friend/:username", userController.getListByUserName);

module.exports = router;
