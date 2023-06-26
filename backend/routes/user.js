const router = require("express").Router();
const userController = require("../controllers/userController");

// const upload = require("multer")({ dest: "/uploads/" });

// search friend
router.get("/search-friend/:username", userController.getListByUserName);

//
router.post("/change-avatar", userController.changeAvatar);

router.patch("/update", userController.updateGoldandRuby);

module.exports = router;
