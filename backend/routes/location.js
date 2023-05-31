const router = require("express").Router();

const locationController = require("../controllers/locationController");

router.get("/get",locationController.getLocations)
router.post("/post",locationController.postLocations)

module.exports = router;
