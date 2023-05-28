const router = require("express").Router();

const passport = require("../configs/passport")
const authController = require('../controllers/authController');

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);
//
router.get('/google/callback', passport.authenticate('google'));

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/get/:username",authController.getUserByUsername)

module.exports = router;
